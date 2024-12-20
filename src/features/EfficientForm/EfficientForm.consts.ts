export const TITLE = 'Подсчет коэффициента физической активности';

export const SLICE_NAME = 'EfficientForm';

export const PERSONAL_CALC = [
  {
    key: 1,
    name: 'Базовые потребности',
    children: [
      {
        key: 11,
        name: 'Сон',
        duration: 0,
        coefficent: 1,
        coefficentByDuration: 0,
      },
      {
        key: 12,
        name: 'Прием пищи',
        duration: 0,
        coefficentByDuration: 0,
        coefficent: 1.5,
      },
      {
        key: 13,
        name: 'Уход за собой (одевание, купание)',
        duration: 0,
        coefficentByDuration: 0,
        coefficent: 2.3,
      },
    ],
  },
  {
    key: 2,
    name: 'Работа',
    children: [
      {
        key: 21,
        name: 'Сидячая работа (офисный работник, кассир в магазине, руководитель предприятия, менеджер, инженер, педагог)',
        duration: 0,
        coefficentByDuration: 0,
        coefficent: 1.4,
      },
      {
        key: 22,
        name: 'Подвижная работа (официант, мерчендайзер, ветеринарный работник, медсестра, санитар, тренер)',
        duration: 0,
        coefficentByDuration: 0,
        coefficent: 1.6,
      },
      {
        key: 23,
        name: 'Более подвижная работа (наладчик, врач-хирург, химик, водитель, работник пищевой промышленности, продавец, железнодорожник),',
        duration: 0,
        coefficentByDuration: 0,
        coefficent: 1.9,
      },
      {
        key: 24,
        name: 'Тяжелая физическая работа (строительные и сельскохозяйственные рабочие, механизаторы,работники нефтяной, газовой, целлюлозно-бумажной промышленности, металлурги)',
        duration: 0,
        coefficentByDuration: 0,
        coefficent: 2.2,
      },
      {
        key: 25,
        name: 'Учеба (студенты, школьники)',
        duration: 0,
        coefficentByDuration: 0,
        coefficent: 1.4,
      },
    ],
  },
  {
    key: 3,
    name: 'Работа по дому',
    children: [
      {
        key: 31,
        name: 'Готовка пищи',
        duration: 0,
        coefficentByDuration: 0,
        coefficent: 2.1,
      },
      {
        key: 32,
        name: 'Стирка, мытьё посуды, подметание, без применения машин',
        duration: 0,
        coefficentByDuration: 0,
        coefficent: 2.3,
      },
      {
        key: 33,
        name: 'Генеральная уборка',
        duration: 0,
        coefficentByDuration: 0,
        coefficent: 2.8,
      },
      {
        key: 34,
        name: 'Тяжелая работа по дому и двору (поднос воды, дров, уборка снега)',
        duration: 0,
        coefficentByDuration: 0,
        coefficent: 4.4,
      },
    ],
  },
  {
    key: 4,
    name: 'Перемещения и транспорт',
    children: [
      {
        key: 41,
        name: 'Поездки в общественном транспорте',
        duration: 0,
        coefficentByDuration: 0,
        coefficent: 1.2,
      },
      {
        key: 42,
        name: 'Вождение автомобиля',
        duration: 0,
        coefficentByDuration: 0,
        coefficent: 2,
      },
      {
        key: 43,
        name: 'Пешая ходьба в среднем темпе',
        duration: 0,
        coefficentByDuration: 0,
        coefficent: 3.4,
      },
      {
        key: 44,
        name: 'Пешая ходьба в быстром темпе',
        duration: 0,
        coefficentByDuration: 0,
        coefficent: 4,
      },
    ],
  },
  {
    key: 5,
    name: 'Отдых',
    children: [
      {
        key: 51,
        name: 'Пассивный отдых (просмотр телевизора, чтение, общение с друзьями дома или в баре)',
        duration: 0,
        coefficentByDuration: 0,
        coefficent: 1.4,
      },
      {
        key: 52,
        name: 'Регулярные аэробные упражнения низкой интенсивности (быстрая ходьба, медленный бег)',
        duration: 0,
        coefficentByDuration: 0,
        coefficent: 4.2,
      },
      {
        key: 53,
        name: 'Регулярные упражнения средней и высокой интенсивности (быстрая езда на велосипеде, быстрый бег, лыжи и сноуборд, кайт и т.п.)',
        duration: 0,
        coefficentByDuration: 0,
        coefficent: 6.5,
      },
    ],
  },
  {
    key: 6,
    name: 'Дополнительная активность',
    children: [
      {
        key: 61,
        name: 'Танцы',
        duration: 0,
        coefficentByDuration: 0,
        coefficent: 3.7,
      },
      {
        key: 62,
        name: 'Аэробные упражнения низкой интенсивности',
        duration: 0,
        coefficentByDuration: 0,
        coefficent: 4.2,
      },
      {
        key: 63,
        name: 'Упражнения средней и высокой интенсивности',
        duration: 0,
        coefficentByDuration: 0,
        coefficent: 6.5,
      },
      {
        key: 64,
        name: 'Утренний бег',
        duration: 0,
        coefficentByDuration: 0,
        coefficent: 6.6,
      },
    ],
  },
];

export enum EfficientTabs {
  default = '0',
  individual = '1',
}

export const TAB_ITEMS = [
  { label: 'Стандартные значения', id: EfficientTabs.default },
  { label: 'Рассчитать индивидуально', id: EfficientTabs.individual },
];
