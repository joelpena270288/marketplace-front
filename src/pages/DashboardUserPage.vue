<script setup lang="ts">
import PaginatedTable from '../components/GenericTableComponent.vue'

const apiUrl = 'https://api.example.com/users' // Reemplázalo con tu API real

interface Column {
  name: string
  label: string
  field: string
  align: 'left' | 'center' | 'right'
  sortable?: boolean
}

const columns: Column[] = [
  { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
  { name: 'name', label: 'Nombre', field: 'name', align: 'center', sortable: true },
  {
    name: 'Descripcion',
    label: 'Descripcion',
    field: 'description',
    align: 'right',
    sortable: false,
  },
]
</script>

<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <h5>Mis Tiendas</h5>
      </q-card-section>
      <q-card-section>
        <PaginatedTable :title="'Tiendas'" :columns="columns" rowKey="id" :fetchEndpoint="apiUrl" />
      </q-card-section>
    </q-card>
  </q-page>
</template>
