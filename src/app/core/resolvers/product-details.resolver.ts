import { inject, Service } from '@angular/core';
import { ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { IProduct, IProductRes } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { catchError, of } from 'rxjs';

@Service()
export class ProductDetailsResolver implements Resolve<IProductRes | null> {
     private _productService = inject(ProductService);
      private _router = inject(Router);
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<IProductRes | RedirectCommand | null> {
   
        const slug = route.paramMap.get('slug');
        if(slug){
        
           
            return this._productService.getProductBySlug(slug).pipe(catchError(err=>{
this._router.navigate(['/product-list']);
return of(null);
            }))
        }

return of(null)
       
    }
}
