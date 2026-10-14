import { Component, OnInit } from '@angular/core';
import { ContentPopulateService } from './content-populate.service';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

export interface CourseContent{
  id: number,
  __popped: string,
  tutorial_text: string,
  content_name: string,
  createdAt: string,
  updatedAt: string,
  publishedAt: string,
  subject: string,
  grade: number,
  classesVisible: boolean,
}

interface Course{
  id: number,
  name: string,
  classes: string[],
  classesVisible: boolean,
}


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})



export class LandingPageComponent implements OnInit{

  angleUp = faAngleUp;
  angleDown = faAngleDown;

  courseContent: CourseContent[] = [];
  // courses: Course[] = [];
  // subjectCourses: Course[] = [];
  mathClasses: CourseContent[] = [];
  englishClasses: CourseContent[] = [];
  
  mathClassesVisible: boolean = true;
  englishClassesVisible: boolean = true;
  // englishCourse: Course[] = [];
  // mathsCourse: Course[] = [];
  
  constructor(
    private contentPopulateService: ContentPopulateService
  ){}
 
  ngOnInit() {
    //make http request
    console.log("working")
    // this.contentPopulateService.getCourses();
    this.contentPopulateService.getCourses().subscribe(res => {
      console.log("In the comp: " + res);
      this.courseContent = res;

      //setting class visible property for every element
      this.courseContent.map(element => element.classesVisible = true);
      // for (let i=0; i<this.courseContent.length; i++){
      //   arrangeCourses(this.courseContent[i], this.subjectCourses);
      // }

       //arranging courses w.r.t classes
       this.mathClasses = this.courseContent.filter(val => val.subject == "Maths");
       this.englishClasses = this.courseContent.filter(val => val.subject == "English");

      //  this.mathClasses.map(element => {
      //   this.mathsCourse.push({id: element.id, name: element.subject, classes})
      //  })
       

       console.log("Maths: " + JSON.stringify(this.mathClasses[0]));
       console.log("Maths: " + this.englishClasses[0]);
      // this.courseContent.forEach(item => {
      //   let courseFound = this.subjectCourses.find(val => val.name == item.subject)
      //   // if course already found
      //   if(courseFound !== undefined){
      //     this.subjectCourses[courseFound.]
      //   }
      //   else{
      //     this.subjectCourses.push({id: item.id, name: item.subject, classes: [item.content_name], classesVisible: true})
      //   }
      // })
      // this.courseContent.filter(val => val.subject == "Maths")
      
    });

    // this.courses = [
    //   {id: 1, name: "Maths", classes:["Prep 1", "Prep 2", "1st Grade", "2nd Grade", "3rd Grade", "4th Grade", "5th Grade"], classesVisible: true},
    //   {id: 2, name: "Science", classes:["Prep 1", "Prep 2", "1st Grade", "2nd Grade", "3rd Grade", "4th Grade", "5th Grade"], classesVisible: true},
    //   {id: 3, name: "Arts", classes:["Prep 1", "Prep 2", "1st Grade", "2nd Grade", "3rd Grade", "4th Grade", "5th Grade"], classesVisible: true},
    //   {id: 4, name: "English", classes:["Prep 1", "Prep 2", "1st Grade", "2nd Grade", "3rd Grade", "4th Grade", "5th Grade"], classesVisible: true},
    // ];
  }

  //function on class click
  someFunction(subject: string){
    if(subject == "Maths"){this.mathClassesVisible = !this.mathClassesVisible}
    else if(subject == "English"){this.englishClassesVisible = !this.englishClassesVisible}
  }
  // someFunction(course:CourseContent){
  //   course.classesVisible = !course.classesVisible;
  // }



}
