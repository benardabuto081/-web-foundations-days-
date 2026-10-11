# Day 7 Assignment: Scaling a Photo-Sharing App

## 1. Assumptions

SnapShare is a photo-sharing application where users upload photos and scroll through a feed of photos from people they follow.

The following assumptions are used for the calculations:

| Metric | Assumption |
| :--- | :---: |
| Registered users | 10,000,000 |
| Daily active users | 10% of registered users |
| Photos uploaded per active user per day | 1 |
| Feed pages viewed per active user per day | 50 |
| Average original photo size | 2 MB |
| Average thumbnail size | 50 KB |
| Seconds per day | 86,400 |
| Days per year | 365 |
| Peak traffic multiplier | 5× average traffic |
| Photo retention | At least one year |

For simplicity, storage calculations use decimal units: 1 MB = 1,000 KB, 1 GB = 1,000 MB, and 1 TB = 1,000 GB. The estimates exclude database overhead, backups, replication overhead, and other application data.

---

## 2. Traffic and Storage Calculations

### 2.1 Daily Active Users
Daily active users (DAU) are 10% of the 10 million registered users.
* $10,000,000 \times 0.10 = 1,000,000$
* **Daily active users = 1,000,000.**

### 2.2 Photo Uploads Per Day
Each daily active user uploads one photo per day.
* $1,000,000 \times 1 = 1,000,000$ photos per day
* **Daily uploads = 1,000,000 photos.**

### 2.3 Average and Peak Uploads Per Second
There are 86,400 seconds in a day.
* **Average uploads per second:** $1,000,000 \div 86,400 \approx 11.57 \approx 11.6$ uploads/sec.
* **Peak uploads per second:** $11.57 \times 5 \approx 57.87 \approx 58$ uploads/sec.

### 2.4 Feed Views Per Day
Each daily active user views 50 feed pages per day.
* $1,000,000 \times 50 = 50,000,000$ feed pages per day
* **Daily feed views = 50,000,000.**

### 2.5 Average and Peak Feed Views Per Second
* **Average feed requests per second:** $50,000,000 \div 86,400 \approx 578.70 \approx 579$ requests/sec.
* **Peak feed requests per second:** $578.70 \times 5 \approx 2,893.52 \approx 2,894$ requests/sec.

### 2.6 Photo Storage Per Year
Each photo consists of a 2 MB original file and a 50 KB thumbnail ($50 \text{ KB} = 0.05 \text{ MB}$).
* **Total storage per uploaded photo:** $2 \text{ MB} + 0.05 \text{ MB} = 2.05 \text{ MB}$.
* **Daily storage growth:** $1,000,000 \times 2.05 \text{ MB} = 2,050,000 \text{ MB} = 2,050 \text{ GB} = 2.05 \text{ TB/day}$.
* **Annual storage growth:** $2.05 \text{ TB} \times 365 = 748.25 \text{ TB/year}$ (approximately 0.75 PB).

### 2.7 Summary Table

| Metric | Estimate |
| :--- | :---: |
| Daily active users | 1,000,000 |
| Daily photo uploads | 1,000,000 |
| Average uploads per second | 11.6 |
| Peak uploads per second | 58 |
| Daily feed views | 50,000,000 |
| Average feed requests per second | 579 |
| Peak feed requests per second | 2,894 |
| Daily photo storage growth | 2.05 TB |
| Annual photo storage growth | 748.25 TB |

---

## 3. Is SnapShare Read-Heavy or Write-Heavy?

SnapShare is a **read-heavy system** because users view approximately 50 million feed pages per day while uploading only 1 million photos per day (a ratio of 50 feed requests for every single photo upload). 

This design implication means the architecture must heavily prioritize efficient reads by deploying CDNs, database read replicas, caching tiers, and horizontally scalable application servers to handle thousands of concurrent timeline lookups with minimal latency.

---

## 4. Why Photos Should Not Be Stored Inside the Database

Photos should be stored in **object storage**, not directly inside database rows. 

Storing millions of large binary files (BLOBs) inside a relational database severely degrades query execution performance, bloats backup files, and multiplies infrastructure costs. Object storage is built specifically to hold large unstructured files at massive scale and integrates seamlessly with CDNs. The database should only store lightweight metadata (such as Photo IDs, Owner IDs, object keys, captions, and timestamps).

---

## 5. Architecture Diagram

```text
                       +----------------------+
                       |     Users / Apps     |
                       +----------+-----------+
                                  |
                 +----------------+----------------+
                 |                                 |
                 v                                 v
      +----------------------+          +----------------------+
      |         CDN          |          |    Load Balancer     |
      |                      |          |                      |
      | Cached photos and    |          | Distributes API      |
      | thumbnails           |          | requests             |
      +----------+-----------+          +----------+-----------+
                 |                                 |
                 | Cache miss                      v
                 |                      +----------------------+
                 +--------------------->|    App Servers       |
                                        |                      |
                                        | Uploads, feeds,      |
                                        | authentication,      |
                                        | metadata and access  |
                                        +-----+-----------+----+
                                              |           |
                                      Metadata|           | Thumbnail job
                                              |           |
                             +----------------+           v
                             |                   +----------------------+
                             v                   |        Queue         |
                    +------------------+         +----------+-----------+
                    |      Cache       |                    |
                    |                  |                    v
                    | Feed data and    |         +----------------------+
                    | hot metadata     |         |  Background Worker   |
                    +--------+---------+         |                      |
                             |                   | Generates thumbnails |
                             v                   +----------+-----------+
                    +------------------+                    |
                    |   Primary DB     |                    |
                    |                  |                    |
                    | Users, photo     |                    |
                    | metadata, follows|                    |
                    +--------+---------+                    |
                             |                              |
                      Replication                           |
                             |                              |
                             v                              v
                    +------------------+         +----------------------+
                    |   Read Replica   |         |   Object Storage     |
                    |                  |         |                      |
                    | Eligible read    |         | Original photos and  |
                    | queries          |         | generated thumbnails |
                    +------------------+         +----------+-----------+
                                                            |
                                                            v
                                                           CDN
