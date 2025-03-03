<template>
  <q-card class="q-pa-md">
    <!-- Título de la Tabla -->
    <q-card-section>
      <div v-if="title" class="text-h6">{{ title }}</div>
    </q-card-section>

    <!-- Filtro de Búsqueda -->
    <q-card-section>
      <q-input
        v-model="internalFilter"
        label="Buscar..."
        dense
        clearable
        @update:model-value="fetchPaginatedData"
      />
    </q-card-section>

    <!-- Tabla -->
    <q-card-section>
      <q-table
        flat
        bordered
        :rows="paginatedRows"
        :columns="computedColumns"
        :row-key="rowKey"
        :filter="internalFilter"
        :loading="loading"
        @request="handleRequest"
      >
        <!-- Renderizar dinámicamente las celdas según columnas -->
        <template v-for="column in columns" v-slot:[`body-cell-${column.name}`]="props">
          <slot :name="`body-cell-${column.name}`" :props="props" />
        </template>

        <!-- Sin registros -->
        <template v-slot:no-data>
          <div class="text-center text-subtitle2">No se encontraron datos</div>
        </template>
      </q-table>
    </q-card-section>

    <!-- Selector de Filas por Página -->
    <q-card-section>
      <q-select
        v-model="rowsPerPage"
        :options="[10, 25, 50]"
        label="Filas por página"
        dense
        @update:model-value="fetchPaginatedData"
      />
    </q-card-section>

    <!-- Paginador -->
    <q-card-section class="q-pt-none">
      <q-pagination
        v-model="currentPage"
        :max="Math.ceil(totalRows / rowsPerPage)"
        color="primary"
        boundary-numbers
        @update:model-value="fetchPaginatedData"
      />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useQuasar } from 'quasar'
import type { PropType } from 'vue'

const props = defineProps({
  title: String,
  columns: {
    type: Array as PropType<Column[]>,
    required: true,
  },
  rowKey: {
    type: String,
    required: true,
  },
  fetchEndpoint: {
    type: String,
    required: true,
  },
  filter: {
    type: String,
    default: '',
  },
})

const $q = useQuasar()
const internalFilter = ref(props.filter)
const currentPage = ref(1)
const rowsPerPage = ref(10)
const totalRows = ref(0)
const paginatedRows = ref([])
const loading = ref(false)
const sortBy = ref('')
const descending = ref(false)

interface Column {
  name: string
  label: string
  field: string | ((row: Record<string, unknown>) => unknown)
  align: 'left' | 'center' | 'right'
  sortable?: boolean
}

const computedColumns = computed(() => {
  return props.columns.map((column) => ({
    ...column,
    field: column.field || column.name,
  }))
})

// Función para obtener datos desde la API
async function fetchPaginatedData() {
  loading.value = true
  try {
    const response = await fetch(
      `${props.fetchEndpoint}?page=${currentPage.value}&limit=${rowsPerPage.value}&search=${internalFilter.value}&sortBy=${sortBy.value}&descending=${descending.value}`,
    )
    const data = await response.json()
    paginatedRows.value = data.rows
    totalRows.value = data.total
  } catch (error) {
    console.error('Error fetching data:', error)
    $q.notify({ type: 'negative', message: 'Error al cargar datos' })
  } finally {
    loading.value = false
  }
}

// Manejo de ordenamiento y paginación
function handleRequest({ pagination }: { pagination: { sortBy: string; descending: boolean } }) {
  sortBy.value = pagination.sortBy || ''
  descending.value = pagination.descending || false
  fetchPaginatedData()
    .then(() => {})
    .catch((error) => {
      console.log(error)
    })
}

// Watchers
watch([currentPage, rowsPerPage, sortBy, descending, internalFilter], fetchPaginatedData, {
  immediate: true,
})
</script>
