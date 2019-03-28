import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import * as cheerio from 'cheerio';
import { Scraping } from '../../services/scraping.service';
import { Metro } from '../../pages2scrap/metro';
import { Tottus } from '../../pages2scrap/tottus';
import { PlazaVea } from '../../pages2scrap/plazavea';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    public scraping: Scraping,
    public metro: Metro,
    public tottus: Tottus,
    public plazavea: PlazaVea 
  ) {
    this.scrapWebMarkers(); 
  }

  scrapMetro(searchproduct = 'radio', quantity = 15) {
    this.http.get(`https://api.allorigins.win/get?url=${encodeURIComponent('http://www.tottus.com.pe/tottus/search?Nrpp=' + quantity + '&Ntt=' + searchproduct)}`).subscribe(res => {
      let $ = cheerio.load(res['contents']);
      $('div.item-product-caption').each((i,e) => {
        console.log($('div.caption-bottom-wrapper h5 div', e).text().trim());
      });
    }); 
  }

  scrapWebMarkers() {
    let parametersMetro = this.metro.processParameters();
    let parametersTottus = this.tottus.processParameters();
    let parametersPlazaVea = this.plazavea.processParameters();
    let arrPromises = [];
    arrPromises.push(this.scraping.scrapPage(this.metro.url, parametersMetro, this.metro.domproperties));
    arrPromises.push(this.scraping.scrapPage(this.tottus.url, parametersTottus, this.tottus.domproperties));
    arrPromises.push(this.scraping.scrapPage(this.plazavea.url, parametersPlazaVea, this.plazavea.domproperties));
    Promise.all(arrPromises).then(arrProds => {
      let metroprod = arrProds[0];
      let tottusprod = arrProds[1];
      let plazaveaprod = arrProds[2];
    });
    
  }
  
}
