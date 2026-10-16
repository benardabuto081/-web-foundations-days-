# Day 8 Reflection

Looking back over the course, the hardest shift was moving from building pages to designing systems. In Days 1 to 4 I built web pages with HTML, CSS and JavaScript, where I could see the result in the browser straight away. From Day 5 onward the work was about decisions I could not see: how to shape a REST API for a library, how to design the tables for a school database, and how a photo app keeps working when many more people use it. The concept I found most demanding was thinking about many users at the same time, especially in this final assignment, where two people can click the same seat at the same moment. I worked through it by doing the arithmetic first, so I could see the big sale is about 550 times busier than a normal day, and then by asking what the database must guarantee, which led to transactions and a unique constraint.

The part of my capstone I would improve is the explanation of why I made each choice, not just what the choice was. I would also test the design against failure cases, such as a payment that fails halfway. Clearer diagrams and a longer README would make the work easier for someone new to read.

Next I want to learn how to build and deploy a real backend with a database, and to practise load testing so I can check estimates against real numbers instead of only calculating them.
