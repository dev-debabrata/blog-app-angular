import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { PostService } from '../../../services/post-service';
import { Loader } from '../../../components/loader/loader';
import { Error } from '../../../components/error/error';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, Loader, Error],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.css',
})
export class PostDetail {
  private route = inject(ActivatedRoute);
  public router = inject(Router);
  private postService = inject(PostService);

  private destroyRef = inject(DestroyRef);

  post: any = null;
  isLoading = true;
  errorMsg = false;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    const postDetailSub = this.postService.getPostById(id).subscribe({
      next: (res) => {
        this.post = res;
        this.isLoading = false;
        console.log(res);
      },
      error: (err) => {
        this.errorMsg = true;
        this.isLoading = false;
        console.log(err);
      },
    });

    this.destroyRef.onDestroy(() => {
      postDetailSub.unsubscribe();
    });
  }
}
