import { Component, OnInit, Input } from '@angular/core';
import { loadingAnimation } from '../animations/loading.animation';
import { CommentService } from '../services/comment.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card-comment',
  templateUrl: './card-comment.component.html',
  styleUrls: ['./card-comment.component.css'],
  animations: [loadingAnimation()]
})
export class CardCommentComponent implements OnInit {

  _elements : string[] = ["#ffe5ec", "#ff80a0", "#ff2e63", "#800020", "#1a0006"];
  public elements : string[];

  @Input() comment;
  currentComment: Observable<any>;

  constructor(
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.set();
  }

  getCurrentCommet(id: string){
    this.currentComment = this.commentService.get_currentComment(id);
  }

  set(){
    this.elements = this._elements; 
    this.scheduleNextIteration();
  }

  scheduleNextIteration(){
    setTimeout(() => {
      if(this.elements.length == 0)
        return this.set()
      this.clear(); 
    }, 100 * this._elements.length + 300);
  }

  clear(){
    this.elements = [];
    this.scheduleNextIteration();
  }
}
