const Database = require('./db');
const createProffy = require('./createProffy');

Database.then(async (db) => {
  //inserir dados

  proffyValue = {
    name: 'Mayk brito',
    avatar:
      'https://avatars2.githubusercontent.com/u/6643122?s=460&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4',
    whatsapp: '99898988888',
    bio:
      'Entusiasta das melhores tecnologias de química avançada.Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.',
  };

  classValue = {
    subject: 1,
    cost: '35',
    //proffy id virar pelo banco de dados
  };

  classScheduleValues = [
    //class_id virar pelo banco de dados,apos cadastramos a class
    {
      weekday: [1],
      time_from: [720],
      time_to: [1220],
    },
    {
      weekday: [0],
      time_from: [520],
      time_to: [1220],
    },
  ];

  // await createProffy(db, { proffyValue, classValue, classScheduleValues });

  // consultar os dados inserido
  // todos os proffys
  const selectedProffys = await db.all('SELECT * FROM proffys');
  //console.log(selectedProffys);

  //consultar as classes de um determinado professor
  //e trazer junto os dados do professor
  const selectedClassesAndProffys = await db.all(`
    SELECT classes.*, proffys.*
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE classes.proffy_id = 1;
  `);
  // console.log(selectedClassesAndProffys);

  //o horário que a pessoa trabalha, exem: é das 8h - 18h
  //o horario do time_from (8h) precisa ser menor ou igual ao horário solicitado
  //o time_to precisa ser acima
  const selectClassesSchedules = await db.all(`
    SELECT class_schedule.*
    FROM class_schedule
    WHERE class_schedule.class_id = "1"
    AND class_schedule.weekday = "0"
    AND class_schedule.time_from <= "1300"
    AND class_schedule.time_to > "1300"
  `);

  console.log(selectClassesSchedules);
});