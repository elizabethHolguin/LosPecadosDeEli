import { Component, OnInit } from '@angular/core';
import { ApplicationStateService } from '../../services/application-state.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductServiceAdmin } from '../services/product_admin.service';
import { Product } from 'src/structures/product.structure';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {
  public form_product: FormGroup;
  public form_category: FormGroup;

  public file_product: File;

  constructor(
    public appService: ApplicationStateService,
    public categoryService: CategoryService,
    private product_service_admin: ProductServiceAdmin,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form_product = this.formBuilder.group({
      name: null,
      categoryID: null,
      description: null,
      url_image: null,
      unitPrice: null
    });

    this.form_category = this.formBuilder.group({
      name: null,
      description: null,
    });

    this.categoryService.getcategories();
  }

  onSubmit(form){
    if(!form.name || !form.categoryID || !form.description || !form.unitPrice || form.unitPrice <= 0 || !this.file_product)
      this.appService.catchError(4);
    else {
      this.appService.showLoadingScreen();

      let new_product : Product= {
        categoryID: form.categoryID,
        name: form.name,
        description: form.description,
        unitPrice: form.unitPrice,
      }
        
      this.product_service_admin.create_product(new_product, this.file_product).then(() => {
          this.appService.changeMessage(`Producto ${new_product.name} añadido con exito`);
          this.form_product.reset();
      })
      .catch(() => this.appService.changeMessage("Ocurrio un error"));
    }
    
  }

  onSubmitCategory(form){
    if(!form.name || !form.description)
      this.appService.catchError(4);
    else {
      this.appService.showLoadingScreen();

      let new_category = {
        categoryname: form.name,
        description: form.description,
      }
        
      this.categoryService.create_category(new_category).toPromise()
      .then(() => {
          this.appService.changeMessage(`Categoria ${new_category.categoryname} añadido con exito`);
          this.form_category.reset();
          this.categoryService.getcategories();
      })
      .catch(() => this.appService.changeMessage("Ocurrio un error"));
    }
  }

  changeGround(event: any){
    let temp_image = event.target.files[0];
    if(temp_image && (temp_image.type == 'image/jpeg' || temp_image.type == 'image/png'))
      this.file_product = temp_image;
  }
}
