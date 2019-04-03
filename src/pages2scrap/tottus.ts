import { Injectable } from '@angular/core';

@Injectable()
export class Tottus {
  url = 'http://www.tottus.com.pe/tottus/search';
  parameters = {
    Nrpp: 15,
    Ntt: 'arroz' 
  }; 
  domproperties = {
    rootNode: 'div.item-product-caption',
    body: {
      id: ['div i', 'id'],
      description: 'div.caption-bottom-wrapper h5 div',
      brand: 'div.caption-bottom-wrapper h5 span', 
      price: 'div.caption-bottom-wrapper div.prices span.active-price span',
      image: 'div.caption-top-wrapper img',
      quantity: 'div.caption-bottom-wrapper div.statement'
    }
  };

  setQuantity(q) {
    this.parameters.Nrpp = q;
  }
  setProduct(p) {
    this.parameters.Ntt = p;
  }
  processParameters() {
    let p = '?';
    for (let k in this.parameters) {
      p += (k + "=" + this.parameters[k] + '&'); 
    }
    return p;
  }
}
