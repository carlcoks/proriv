<template>

  <section
  	class="service">
	<div
		class="wr">
			<table
				class="table"
				v-for="(item, i) in data.serviceData">
					<tr class="table__col table__header">
						<td
							class="table_row">
							Значение
						</td>
						<td
							class="table_row">
							Кол. человек		
						</td>
						<td
							class="table_row">
							Кол. человек пользующийся услугой
						</td>
						<td
							class="table_row">
							Соотношение к общему числу пользователей		
						</td>
					</tr>
					<tr 
						class="table__col"
						v-for="(value, i) in item">
						<td
							class="table_row">
							{{ i }}
						</td>
						<td 
							class="table_row">
							{{ data.peopleData[i] }}	
						</td>
						<td
							class="table_row">
							{{ value }}		
						</td>
						<td
							class="table_row">
							{{ count(data.peop) }}		
						</td>
					</tr>
			</table>
			<!-- <div 
				class="analytics-table"
				id="table">
					<div
						class="table__col table__header">
							<div 
								class="table__row">
								ID пользователя		
							</div>
							<div
								class="table_row">
								Рекомендуемые категории услуг		
							</div>
					</div>
					<div
						class="table_col"
						v-for="(item, i) in data.">
							
					</div>
			</div> -->
		</div>
  </section>

</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'service',
	asyncData({ store, route }) {
		return store.dispatch('service/getStatic', {id: route.params.id});
	},
	computed: {
		...mapState('service', ['data']),
	},
}
</script>

<style lang="css">
</style>
