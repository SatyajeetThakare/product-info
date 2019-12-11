import { Component, OnInit } from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  product_name: string = '';
  list_products: ['oil', 'shampoo'];

  ngOnInit() {

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });

    this.route.params.subscribe(params => {
      this.product_name = params.product.trim().toLowerCase();
      console.log('this.product_name', this.product_name);
      this.getProductImages(this.product_name);
    });
  }

  baseUrl: string = 'assets/images/';
  productInfo: any;
  productImage: any;
  getProductImages(productName: string) {
    console.log('productName', productName);
    this.productImage = {
      poster: this.baseUrl + 'poster-' + productName + '.jpg',
      posterMob: this.baseUrl + 'poster-' + productName + '-mob.jpg',
      productInfo: this.baseUrl + 'productInfo-' + productName + '.png',
      reference1: this.baseUrl + 'reference1-' + productName + '.png',
      reference2: this.baseUrl + 'reference2-' + productName + '.png',
      reference3: this.baseUrl + 'reference3-' + productName + '.png',
    }

    this.productInfo = {
      header: (productName == 'shampoo') ? `Sesa Ayurvedic Shampoo` : `Sesa Ayurvedic Hair Oil`,
      description: (productName == 'shampoo') ? `Sesa Ayurvedic Oil is a distinctive combination of 18 
      nourishing herbs, 5 nourishing oils and milk all boiled together in a special process called the 
      'Kshirpak Vidhi'. It consists of natural ingredients like Rasot, Neem beej, Chamelee, Tagar, Khas, 
      Elva, essential oils and Karan Beej. These natural and ayurvedic 
      ingredients helps prevent infection, mental stress, dandruff & lice.` : `Sesa Ayurvedic Shampoo is an ayurvedic blend of 17 botanicals like Bhringraj, triphala, 
        mehandi, jati and yashtimadhu which cleanses and maintains the integrity of scalp and hair. 
        It is the perfect solution for optimum hair nourishment and complete care.`,
      reference1: (productName == 'shampoo') ? `Provides clean and nourished hair` : `Stops hair fall`,
      reference2: (productName == 'shampoo') ? `Prevents hair fall` : `Prevents dandruff`,
      reference3: (productName == 'shampoo') ? `Protects from dandruff and infections` : `Promotes hair growth`,
    }

    console.log('this.productImage', this.productImage);
  }

}
