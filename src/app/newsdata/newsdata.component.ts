declare var require: any
import { DatePipe } from '@angular/common';

import { Component, OnInit } from '@angular/core';

import { NewsdataService } from './newsdata.service'
const Sentiment = require('sentiment');

@Component({
  selector: 'app-newsdata',
  templateUrl: './newsdata.component.html',
  styleUrls: ['./newsdata.component.css'],
  providers:[NewsdataService]
})
export class NewsdataComponent implements OnInit {

  articles:any=[];
  mongoArticles=[];
  AnalyisedArticles=[];
  currentdate:any;
  olddate:any;

  constructor(private newsdataService:NewsdataService, private datePipe:DatePipe ) {
      this.currentdate=this.datePipe.transform(Date(), 'yyyy-MM-dd')
      console.log(this.datePipe.transform(Date(), 'yyyy-MM-dd')); //whatever format you need.
      this.olddate=this.datePipe.transform(new Date(new Date().getTime()-(30*24*60*60*1000)),'yyyy-MM-dd');
      console.log(this.datePipe.transform(new Date(new Date().getTime()-(30*24*60*60*1000)),'yyyy-MM-dd'));
   }

  ngOnInit(){

    this.getNewsFromWeb();
    setTimeout(()=>{
    this.getNewsFromWebById("icici");
    },100);


  }

  getNewsFromWeb(){
      this.newsdataService.getNewsFromWeb().subscribe((data:any) => {
                                                            console.log('News',data.body);
                                                            this.articles=data.body.articles;
                                                            console.log('News Articles',this.articles);
                                                              setTimeout(()=>{
                                                                this.formatToMongo();
                                                              },100);
                                                          },
                                           (error: any) => {
                                                            console.log(error);
                                                          });


    }

    getNewsFromWebById(query){
        this.newsdataService.getNewsFromWebById(query).subscribe((data:any) => {
                                                              console.log('News',data.body);
                                                              this.articles=data.body.articles;
                                                              console.log('News Articles',this.articles);
                                                                setTimeout(()=>{
                                                                  this.formatToMongo();
                                                                },100);
                                                            },
                                             (error: any) => {
                                                              console.log(error);
                                                            });


      }

      formatToMongo(){
          for(let i=0;i<this.articles.length;i++){
            let jsonTemp={};
            jsonTemp["sourceAgency"]=this.articles[i]["source"]["name"];
            jsonTemp["publishedDate"]=this.articles[i]["publishedAt"];
            jsonTemp["title"]=this.articles[i]["title"];
            jsonTemp["descriptionText"]=this.articles[i]["description"];
            this.mongoArticles.push(jsonTemp);
          }

          console.log('Json to Save in Mongo',this.mongoArticles);
          setTimeout(()=>{
            this.analizeSentiment();
          },100);
      }


    analizeSentiment(){
      var options = {
        extras: {
          'fell': -10,
          'lower': -5,
          'non-performing':-10,
          'up':10,
          'seized':-3,
          'probe':-10,
          'alleged':-7,
          'allegedly':-7,
          'cheating':-7,
          'corruption':-10,
          'good':10,
          'great':10,
          'unable':-2
        }
      };

      var sentiment = new Sentiment([options]);
      console.log(sentiment.analyze("lower up",options));

      for(let i=0;i<this.mongoArticles.length;i++){
        let analizedValue=this.mongoArticles[i];
        //sentiment.analyze(this.mongoArticles[i]["title"],options);
        analizedValue["sentimentValue"]=sentiment.analyze(this.mongoArticles[i]["title"],options)["score"]+sentiment.analyze(this.mongoArticles[i]["descriptionText"],options)["score"];;
        analizedValue["positiveValues"]=sentiment.analyze(this.mongoArticles[i]["title"],options)["positive"]||[];
        analizedValue["positiveValues"].concat(sentiment.analyze(this.mongoArticles[i]["descriptionText"],options)["positive"])||[];
        analizedValue["negativeValues"]=sentiment.analyze(this.mongoArticles[i]["title"],options)["negative"];
        analizedValue["negativeValues"].concat(sentiment.analyze(this.mongoArticles[i]["descriptionText"],options)["negative"]);

        this.AnalyisedArticles.push(analizedValue);
      }
      console.log('Json to Show in UI',this.AnalyisedArticles);
    }

}
