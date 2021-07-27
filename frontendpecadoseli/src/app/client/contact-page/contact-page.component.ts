import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Title } from '@angular/platform-browser';
import { CommentService } from 'src/app/services/comment.service';
import { ApplicationStateService } from 'src/app/services/application-state.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {
  public commentForm;

  public provincias: Array<string> = [
    "Cuenca",
    "Guaranda",
    "Azogues",
    "Tulcán",
    "Riobamba",
    "Latacunga",
    "Machala",
    "Esmeraldas",
    "Puerto Baquerizo Moreno",
    "Guayaquil",
    "Ibarra",
    "Loja",
    "Babahoyo",
    "Portoviejo",
    "Santiago: Macas",
    "Tena",
    "Francisco de Orellana",
    "Puyo",
    "Quito",
    "Santa Elena",
    "Santo Domingo",
    "Nueva Loja",
    "Ambato",
    "Zamora"
  ];

  constructor(
    private formBuilder: FormBuilder,
    private titleService: Title,
    private commentSercice: CommentService,
    public appService: ApplicationStateService
  ) {}

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      email: null,
      city: null,
      date_birth: null,
      content: null
    });

    this.titleService.setTitle( "Pecadoseli | Contacto" );
  }

  onSubmit(comment_data){
    if(!comment_data.content || !comment_data.email || !comment_data.city || !comment_data.date_birth)
      this.appService.catchError(4);
    else if(!comment_data.email.includes('@'))
      this.appService.catchError(3);
    else {
      this.appService.clearError();
      this.commentForm.reset()
      this.commentSercice.sendemail(comment_data.email, comment_data.city, comment_data.date_birth, comment_data.content);
      //this.commentSercice.sendcomment(comment_data.email, comment_data.city, comment_data.date_birth, comment_data.content);
    }
  }
}
