const express=  require('express');
const app = express();
const bodyparser=require('body-parser');
const https = require('https'); 
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/",function(req, res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/submit",function(req, res){
    const query=req.body.cityname;
    const apikey ="96b0b79f9b823b89b2a7ac430d6d6a05";
    const unit = "metric";
    const url = ' https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid='+apikey+'&units='+unit;
    https.get(url, function(response){
        console.log(response);
        response.on("data", function(data){
            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const icon = weatherdata.weather[0].icon;
            const description =weatherdata.weather[0].description;
            const imageurl = " http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write('<h1>The temperature')
        });
    });
});
app.listen(3000,function(){
    console.log("server running on port 3000");
});