<script setup lang="ts">
import resumeData from "@/data/resume.json"

const resume = ref(resumeData)

useHead({
  title: "Resume"
})
</script>

<template>
  <div>
    <section v-if="resume">
      <h1>{{ resume.name }}</h1>
      <h2>{{ resume.title }}</h2>
      <div class="summary">
        <div>
          <h3>Summary</h3>
          <p>{{ resume.summary }}</p>
        </div>
        <img :src="resume.picture" alt="Profile Picture" class="profile-pic" />
      </div>

      <h3>Skills</h3>
      <div v-for="category in resume.skills" :key="category.name">
        <h4>{{ category.name }}</h4>
        <div class="skills">
          <span v-for="skill in category.list" :key="skill" :class="['skill-badge', 'level-'+skill.level]">{{
            skill.skill
          }}</span>
        </div>
      </div>

      <h3>Experience</h3>
      <div v-for="job in resume.workExperience" :key="job.position" class="job">
        <h4>{{ job.position }} – {{ job.company }}</h4>
        <span class="jobDates">{{ job.startDate }} to {{ job.endDate }}</span class="jobDates">
        <p>{{ job.summary }}</p>
        <ul>
          <li v-for="highlight in job.highlights" :key="highlight">
            {{ highlight }}
          </li>
        </ul>
      </div>

      <h3>Personal Projects</h3>
      <div v-for="project in resume.personalProjects" :key="project.name" class="job">
        <h4>{{ project.name }} <span class="visit-site"><a :href="project.url" target="_blank">Visit Site</a></span></h4>
        <span class="jobDates">{{ project.date }}</span class="jobDates">
        <span><small> | {{ project.stack }}</small></span>
      </div>

      <h3>Education</h3>
      <div v-for="edu in resume.education" :key="edu.institution" class="job">
        <h4>{{ edu.area }} – {{ edu.institution }}</h4>
        <span class="studyType">{{ edu.studyType }}</span> <span class="jobDates">{{ edu.startDate }} to {{ edu.endDate }}</span class="jobDates">
        </div>
    </section>
  </div>
</template>

<style scoped>
section {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
}
.summary {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    & p {
      font-size: .95rem;
    }

    & img.profile-pic {
      flex-shrink: 0;
      box-shadow: 0 0 25px #ccc;
      border-radius: 100%;
      width: 150px;
      height: 150px;
      border: 3px solid #444
    }
}
h1, h2 {
    margin: 0;
}
h2 {
    margin-bottom: 1rem;
    color: #666;
    font-weight: normal;
}
h3 {
    margin-top: 2rem;
    margin-bottom: 1rem;
    border-bottom: 2px solid #444;
    padding-bottom: 0.3rem;
}
.job {
  margin-bottom: 1.5rem;
  & h4 {
    margin-bottom: 0.2rem;
  }
  & .jobDates {
    font-style: italic;
    font-size: 0.9rem;
    color: #666;
  }
  & .studyType {
    font-size: 0.95rem;
    color: #333;
  }
  & p,
  & ul li {
    font-size: 0.85rem;
  }
}
.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.skill-badge {
  background-color: #f0f0f0;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  white-space: nowrap;
}

.level-1 {
  background-color: #f0f0f0;
}
.level-2 {
  background-color: #e7f1ff;
}
.level-3 {
  background-color: #cff4fc;
}
.level-4 {
  background-color: #e7ffe7;
}

.visit-site a {
    font-size: 0.8rem;
    margin-left: 1rem;
    text-decoration: none;
    color: #0077b5;
    border: 1px solid #0077b5;
    padding: 2px 6px;
    border-radius: 4px;
    transition: background-color 0.3s, color 0.3s;
    &:hover {
        background-color: #0077b5;
        color: white;
    }
}

@media (max-width: 700px) {
    .summary {
        flex-direction: column-reverse;;
        & img.profile-pic {
            margin: 0 auto;
        }
    }
}
</style>
