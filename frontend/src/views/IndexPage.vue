<template>

	<section
		class="index-page">

		<div
			class="bg-image"></div>
		<div
			class="content">
			<h1
				class="content-title">
				Найди своего тренера
			</h1>
			<form
				class="content-form">

				<div
					class="content-form__line">
					<div
						class="content-form__line-input">
						<input
							type="text"
							class="inpt"
							v-model.trim="search"
							placeholder="Например, тренер по боксу">
						<button
							class="btn btn-search">
							<img
								src="/img/icons/search.png"
								alt="">
						</button>
						<div
							class="line"></div>
					</div>
				</div>

			</form>
			<div
				class="content-btn">
				<router-link
					to="/treners"
					class="content-btn__link">
					Каталог тренеров
				</router-link>
			</div>
		</div>

	</section>

</template>

<script>
export default {
  name: 'index',
	data() {
		return {
			search: '',
		}
	}
}
</script>

<style lang="sass">
	@import '@/styles/pages/index.sass'
</style>
