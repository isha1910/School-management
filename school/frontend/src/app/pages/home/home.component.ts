import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService, Teacher } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  teachers: Teacher[] = [];
  teacherCount = 0;

  stats = [
    { icon: 'school', value: '50+', label: 'Expert Teachers', color: 'purple' },
    { icon: 'people', value: '1200+', label: 'Happy Students', color: 'blue' },
    { icon: 'emoji_events', value: '25+', label: 'Awards Won', color: 'orange' },
    { icon: 'auto_stories', value: '30+', label: 'Years Legacy', color: 'green' },
  ];

  features = [
    {
      icon: 'auto_stories',
      title: 'Quality Education',
      desc: 'World-class curriculum designed to nurture critical thinking and creativity in every student.',
    },
    {
      icon: 'groups',
      title: 'Experienced Faculty',
      desc: 'Our teachers bring decades of experience and passion for educating the next generation.',
    },
    {
      icon: 'computer',
      title: 'Modern Facilities',
      desc: 'Smart classrooms, science labs, and digital libraries equipped with the latest technology.',
    },
    {
      icon: 'sports_soccer',
      title: 'Sports & Activities',
      desc: 'Comprehensive sports programs and extracurricular activities for holistic development.',
    },
    {
      icon: 'psychology',
      title: 'Student Counseling',
      desc: 'Dedicated counselors to guide students through academic and personal challenges.',
    },
    {
      icon: 'security',
      title: 'Safe Environment',
      desc: 'Secure campus with CCTV monitoring and trained staff ensuring student safety.',
    },
  ];

  constructor(private api: ApiService, public auth: AuthService) {}

  ngOnInit(): void {
    this.api.getTeachers().subscribe({
      next: (res) => {
        this.teachers = (res.data || []).slice(0, 4);
        this.teacherCount = res.data?.length || 0;
      },
    });
  }
}
