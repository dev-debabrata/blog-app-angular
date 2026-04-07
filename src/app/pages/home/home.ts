import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { PostList } from '../posts/post-list/post-list';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, PostList, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
