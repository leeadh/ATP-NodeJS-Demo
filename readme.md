![capture](https://user-images.githubusercontent.com/15122358/44667149-93e07f80-aa4c-11e8-885e-4560f7edcbee.PNG)



This is a demo to showcase how to use Autonomous Transaction Processing (ATP) and connect with Node JS. This is using Node JS to render a simple HTML table and a simple post function which will write and commit to ATP. The templating engine in EJS. 

# Pre-requisites #
1) Please first and foremost refer to the guide docs here on how to provision an ATP instance: https://docs.oracle.com/en/cloud/paas/atp-cloud/index.html
2) Please then create an instance of ATP as per the guide
3) Download the necessary oraclient for NodeJS. For this, please refer here: https://docs.oracle.com/en/cloud/paas/atp-cloud/atpug/connecting-nodejs.html#GUID-AB1E323A-65B9-47C4-840B-EC3453F3AD53. 
4) Remember to download the ATP zip wallet credentials of ATP and place the zip file into this repo when you have git pulled. Also , unzip the wallet in this directory. 

# Steps: #
1) First, refer to the sql statements in the folder when u do a git pull
2) Connect to ATP by using SQL developer. For this please refer to the guide on how to connect to ATP via sql developer: https://docs.oracle.com/en/cloud/paas/atp-cloud/atpug/getting-started.html#GUID-00645C09-4E76-44C6-8BBE-B433D501AADB
3) This will create the table Employee
4) After this run node server.js
5) Go to localhost:8080 and the table of employee data is displayed

![image](https://user-images.githubusercontent.com/15122358/44667451-61835200-aa4d-11e8-93b0-6b5e8ac2b344.png)


6) To insert in a record into ATP, go to Postman and execute the post function found in the server.js. A sample post function is here:
localhost:8080/addEmployee. This will default add in an employee into ATP. 
