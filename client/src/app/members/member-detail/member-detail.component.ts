import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../_model/member';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [TabsModule, NgImageSliderModule,NgIf],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent implements OnInit {
  private memberService = inject(MembersService);
  private route = inject(ActivatedRoute);
  member?: Member;
  galleryImages: { image: string, thumbImage: string }[] = [];

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('username');
    if (!username) return;
    this.memberService.getMember(username).subscribe({
      next: member => {
        this.member = member;
        member.photos.map(p => {
          this.galleryImages = member.photos.map(p => ({
            image: p.url,
            thumbImage: p.url
          }))
        })
      }
    })
  }
}
