import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterestsComponent } from './components/interests/interests.component';
import { NowComponent } from './components/now/now.component';
import { LegoSetsCollectionComponent } from './components/interests/lego-sets/lego-sets.component';
import { BoardGamesCollectionComponent } from './components/interests/board-games/board-games.component';
import { HomeComponent } from './components/home/home.component';
import { TimezonesComponent } from './components/bots/timezonebot/timezones/timezones.component';
import { AuthenticationGuard } from './guards/authentication-guard.guard';
import { ReplybotServerSelectorComponent } from './components/bots/replybot/replybot-server-selector/replybot-server-selector.component';
import { ReplyDefinitionsComponent } from './components/bots/replybot/reply-definitions.component';
import { CallbackComponent } from './components/bots/callback/callback.component';
import { BotsComponent } from './components/bots/bots.component';
import { VideoGamesCollectionComponent } from './components/interests/video-games/video-game-collection/video-game-collection.component';
import { LinksComponent } from './components/links/links.component';
import { BlogPostComponent } from './components/blog/blog-post/blog-post.component';
import { BlogComponent } from './components/blog/blog.component';
import { FeedsComponent } from './components/feeds/feeds.component';
import { LinkPostComponent } from './components/links/link-post/link-post.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { PostComponent } from './components/posts/post/post.component';
import { PostsComponent } from './components/posts/posts.component';
import { BooksCollectionComponent } from './components/interests/books/books.component';
import { FavouriteGamesComponent } from './components/interests/video-games/favourite-games/favourite-games.component';
import { GalleryPostComponent } from './components/gallery/gallery-post/gallery-post.component';
import { ReplyDefinitionEditorComponent } from './components/bots/replybot/reply-definition-editor-dialog/reply-definition-editor-dialog.component';

const routes: Routes = [
  { path: 'blog/:slug', pathMatch: 'full', component: BlogPostComponent },
  { path: 'blog', pathMatch: 'full', component: BlogComponent },
  { path: 'links/:slug', component: LinkPostComponent },
  { path: 'links', component: LinksComponent },
  { path: 'posts/:slug', component: PostComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'gallery/:slug', component: GalleryPostComponent },
  { path: 'gallery', component: GalleryComponent },
  {
    path: 'board-games',
    redirectTo: 'interests/collections/board-games',
    pathMatch: 'full',
  },
  {
    path: 'video-games',
    redirectTo: 'interests/collections/video-games',
    pathMatch: 'full',
  },
  {
    path: 'books',
    redirectTo: 'interests/collections/books',
    pathMatch: 'full',
  },
  { path: 'lego', redirectTo: 'interests/collections/lego', pathMatch: 'full' },
  { path: 'interests/collections/board-games', component: BoardGamesCollectionComponent },
  { path: 'interests/favourite-games', component: FavouriteGamesComponent },
  { path: 'interests/collections/video-games', component: VideoGamesCollectionComponent },
  { path: 'interests/collections/books', component: BooksCollectionComponent },
  { path: 'interests/collections/lego', component: LegoSetsCollectionComponent },
  { path: 'interests', component: InterestsComponent },
  { path: 'now', component: NowComponent },
  { path: 'feeds', component: FeedsComponent },
  {
    path: 'bots/timezonebot',
    component: TimezonesComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'bots/replybot',
    component: ReplybotServerSelectorComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'bots/replybot/reply-definitions',
    component: ReplyDefinitionsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'bots/replybot/reply-definitions/definition',
    component: ReplyDefinitionEditorComponent,
    canActivate: [AuthenticationGuard],
  },
  { path: 'bots', component: BotsComponent },
  { path: 'callback', component: CallbackComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
