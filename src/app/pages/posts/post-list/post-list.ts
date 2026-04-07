import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { Router } from '@angular/router';

import { PostService } from '../../../services/post-service';
import { Post } from '../../../models/post-model';
import { Loader } from '../../../components/loader/loader';
import { Error } from '../../../components/error/error';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [SlicePipe, Loader, Error],
  templateUrl: './post-list.html',
  styleUrl: './post-list.css',
})
export class PostList implements OnInit {
  @Input() limit?: number;

  private postService = inject(PostService);
  private router = inject(Router);

  private destroyRef = inject(DestroyRef);

  posts: Post[] = [];
  isLoading = true;
  errorMsg = false;

  ngOnInit(): void {
    const postSub = this.postService.getPosts().subscribe({
      next: (res: any) => {
        const postsArray: Post[] = Array.isArray(res) ? res : (res.posts ?? []);

        // Sort by latest ID
        const sorted = postsArray.sort((a, b) => b.id - a.id);

        // Apply limit
        this.posts = this.limit ? sorted.slice(0, this.limit) : sorted;
        this.isLoading = false;

        console.log(this.posts);
        // this.posts = res.posts;
        // console.log(res);
      },
      error: (err) => {
        this.errorMsg = true;
        this.isLoading = false;
        console.log(err);
      },
    });

    // Automatically Component Destroyed
    this.destroyRef.onDestroy(() => {
      postSub.unsubscribe();
    });
  }

  // Navigate to product details page
  viewPostDetails(id: number): void {
    this.router.navigate(['/posts', id]);
  }
}
