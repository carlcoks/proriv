<template>

	<section
		class="index">
		<div
			class="wr">

			<div
				class="index-page">

				<h1
					class="index-page__title">
					Здравствуйте, {{ user.profile.name }}
				</h1>

				<div
					class="index-page__block">
					<router-link
						to="/download"
						class="index-page__block-card">
						<div
							class="image">
							<img
								src="/img/icons/girl.svg">
						</div>
						<div
							class="title">
							Загрузить данные
						</div>
					</router-link>
					<router-link
						to="/analytics"
						class="index-page__block-card">
						<div
							class="image">
							<img
								src="/img/icons/robot.svg">
						</div>
						<div
							class="title">
							Аналитика
						</div>
					</router-link>
				</div>

			</div>

		</div>

	</section>

</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'index',
	computed: {
		...mapState('user', ['user']),
	}
}
</script>

<style lang="sass">
	@import '@/styles/pages/index.sass'
</style>
