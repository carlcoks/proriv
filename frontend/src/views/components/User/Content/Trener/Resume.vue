<template>

  <div
    class="resume">

    <about-block
      :about="resume"
      :admin="user_profile.id == user.user_id" />

    <div
      class="resume-block">
      <div
        class="resume-block__title">
        Образование
        <button-block
          v-if="user_profile.id == user.user_id"
          :title="`+ Добавить`"
          :className="`addNew`"
          @clicked="addEducation()" />
      </div>

      <education-block
        :data="education"
        :admin="user_profile.id == user.user_id" />

    </div>
    
    <div
      class="resume-block">
      <div
        class="resume-block__title">
        <span>
          Работа <span class="experience">{{ returnExperience() }}</span>
        </span>
        <button-block
          v-if="user_profile.id == user.user_id"
          :title="`+ Добавить`"
          :className="`addNew`"
          @clicked="addJob()" />
      </div>

      <job-block
        :data="job"
        :admin="user_profile.id == user.user_id" />

    </div>

  </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex';
import http from '@/utils/api';
import educationModel from '@/models/model-education';

import ButtonBlock from '@/components/ButtonBlock';
import AboutBlock from './Resume/About';
import EducationBlock from './Resume/Education';
import JobBlock from './Resume/Job';

export default {
  asyncData ({ store, route }, data) {
    return store.dispatch('resume/getResume', { user_id: route.params.id });
  },
  components: {
    ButtonBlock,
    AboutBlock,
    EducationBlock,
    JobBlock,
  },
  data() {
    return {
      expTitle: ['год', 'года', 'лет'],
    }
  },
  computed: {
    ...mapState('profile', ['user_profile']),
    ...mapState('user', ['user']),
    ...mapState('resume', ['resume', 'education', 'job']),
  },
  methods: {
    ...mapMutations('resume', ['ADD_EDUCATION', 'ADD_JOB']),

    addEducation() {
      const edu = this.education;
      for (let key in edu) {
        if (edu[key].edit) return false;
      }
      this.ADD_EDUCATION(Object.cloneDeep(educationModel));
    },

    addJob() {
      const job = this.job;
      for (let key in job) {
        if (job[key].edit) return false;
      }
      this.ADD_JOB(Object.cloneDeep(educationModel));
    },

    returnExperience() {
      const job = this.job;
      let years = 0;

      job.map(item => {
        years += item.childs[0].date - item.childs[1].date;
      })

      const cases = [2, 0, 1, 1, 1, 2];
      const title = this.expTitle[ (years%100 > 4 && years%100 < 20) ? 2 : cases[(years%10 < 5) ? years%10 : 5] ];
      return `(опыт ${years} ${title})`;
    },
  }
}
</script>

<style lang="css">
</style>
