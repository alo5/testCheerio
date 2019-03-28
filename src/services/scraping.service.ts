import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as cheerio from 'cheerio';

@Injectable()
export class Scraping {
  constructor(public http: HttpClient) {
  }

  scrapPage(url, parameters, domproperties) {
    return new Promise((resolve, reject) => {
      let page;
      let products = [];
      let rootNode = domproperties['rootNode'];
      let bodyNodes = domproperties['body'];
      this.http.get(`https://api.allorigins.win/get?url=${encodeURIComponent(url + parameters)}`).subscribe(resHtml => {
        page = cheerio.load(resHtml['contents']); 
        page(rootNode).each((i, e) => {
          let prodObj = {};
          for (let k in bodyNodes) {
            if (k == 'id') {
              if (Array.isArray(bodyNodes[k])) {
                //prodObj[k] =  
              } else {
                //prodObj[k] = page(bodyNodes[k], e).attr(bodyNodes[k]);
              }
            } else if (k == 'image') {
              prodObj[k] = page(bodyNodes[k], e).attr('src'); 
            } else {
              if (bodyNodes[k] != '') {
                prodObj[k] = page(bodyNodes[k], e).text().trim();     
              } else {
                prodObj[k] = '';
              }
            }
          }
          products.push(prodObj);
        });
        resolve(products);
      }, err => {
        reject(err);
      });
    });
  }

}
