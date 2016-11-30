export default {
  medicines: [
    {
      id: 0,
      name: 'Abbocurium',
      interactions: {
        medicines: [],
        contraindications: [1]      
      }
    },
    {
      id: 1,
      name: 'Vagifem',
      interactions: {
        medicines: [2],
        contraindications: []      
      }
    },
    {
      id: 2,
      name: 'Cabaser',
      interactions: {
        medicines: [1, 4, 9],
        contraindications: []
      }
    },
    {
      id: 3,
      name: 'Dacarbazin 100',
      interactions: {
        medicines: [],
        contraindications: [1, 2]
      }
    },
    {
      id: 4,
      name: 'Quetin',
      interactions: {
        medicines: [2, 9],
        contraindications: [3]
      }
    },
    {
      id: 5,
      name: 'Sadamin',
      interactions: {
        medicines: [],
        contraindications: []
      }
    },
    {
      id: 6,
      name: 'Calcijex',
      interactions: {
        medicines: [],
        contraindications: [1]
      }
    },
    {
      id: 7,
      name: 'Gamma Anty D',
      interactions: {
        medicines: [],
        contraindications: []
      }
    },
    {
      id: 8,
      name: 'Xentic',
      interactions: {
        medicines: [],
        contraindications: [0, 1, 2, 3]
      }
    },
    {
      id: 9,
      name: 'Tabcin Impakt',
      interactions: {
        medicines: [2, 4],
        contraindications: [0, 1, 2, 3]
      }
    }
  ],
  contraindications: [
    { 
      id: 0,
      name: 'Ciąża',
      iconName: 'pregnant-woman'
    },
    {
      id: 1,
      name: 'Karmienie piersią',
      iconName: 'child-friendly'
    },
    {
      id: 2,
      name: 'Kierowanie pojazdami',
      iconName: 'directions-car'
    },
    {
      id: 3,
      name: 'Alkohol',
      iconName: 'local-bar'
    }
  ]
};