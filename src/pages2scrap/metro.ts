import { Injectable } from '@angular/core';

@Injectable()
export class Metro {
  url = 'https://www.metro.pe/buscapagina';
  parameters = {
    sl: '19ccd66b-b568-43cb-a106-b52f9796f5cd',
    PS: 15,
    cc: 15,
    sm: 0,
    PageNumber: 1,
    ft: 'arroz'
  }; 
  domproperties = {
    rootNode: 'li div.product-item',
    body: {
      id: 'data-id',
      description: 'div.product-item__info a.product-item__name',
      brand: 'div.product-item__info div.product-item__brand', 
      price: 'div.product-prices__wrapper span.product-prices__value',
      image: 'div.product-item__image-wrapper img',
      quantity: ''
    }
  };
  setQuantity(q) {
    this.parameters.PS = q;
    this.parameters.cc = q;
  }
  setProduct(p) {
    this.parameters.ft = p;
  }
  setCategory(c) {
    this.parameters.sl = c;
  }
  processParameters() {
    let p = '?';
    for (let k in this.parameters) {
      p += (k + "=" + this.parameters[k] + '&'); 
    }
    return p;
  }
}
