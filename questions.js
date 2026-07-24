window.CRUZA2_FORMS = {
  "staff": {
    "title": "Postulación para Staff",
    "shortTitle": "Staff",
    "description": "Evaluación de disponibilidad, experiencia, compromiso y conocimientos esenciales de roleplay.",
    "icon": "🛡️",
    "sections": [
      {
        "title": "Identificación y disponibilidad",
        "description": "Datos básicos para identificarte y conocer tu disponibilidad real.",
        "fields": [
          {
            "id": "discord_username",
            "label": "Nombre de usuario en Discord",
            "hint": "Ejemplo: @usuario o usuario#0000",
            "type": "text",
            "required": true,
            "maxLength": 60
          },
          {
            "id": "discord_id",
            "label": "ID numérico de Discord",
            "hint": "Activa el modo desarrollador en Discord para copiarlo.",
            "type": "text",
            "required": true,
            "pattern": "^\\d{15,22}$",
            "maxLength": 22
          },
          {
            "id": "age",
            "label": "Edad",
            "type": "number",
            "required": true,
            "min": 13,
            "max": 80
          },
          {
            "id": "country",
            "label": "País de residencia",
            "type": "text",
            "required": true,
            "maxLength": 60
          },
          {
            "id": "daily_hours",
            "label": "¿Cuántas horas reales puedes dedicar diariamente?",
            "type": "text",
            "required": true,
            "maxLength": 100
          },
          {
            "id": "active_schedule",
            "label": "¿En qué horario sueles estar más activo?",
            "type": "text",
            "required": true,
            "maxLength": 120
          },
          {
            "id": "community_time",
            "label": "¿Desde hace cuánto perteneces al Discord de Cruza2 Roleplay?",
            "type": "text",
            "required": true,
            "maxLength": 150
          },
          {
            "id": "microphone",
            "label": "¿Tienes un micrófono funcional y con buena calidad?",
            "type": "select",
            "required": true,
            "options": [
              "Sí",
              "No",
              "Funciona, pero tiene problemas ocasionales"
            ]
          },
          {
            "id": "meetings",
            "label": "¿Podrías asistir a reuniones o llamados del equipo cuando sea necesario?",
            "type": "select",
            "required": true,
            "options": [
              "Sí",
              "No",
              "Depende del horario"
            ]
          },
          {
            "id": "previous_experience",
            "label": "Experiencia previa como Staff",
            "hint": "Menciona servidores, cargo y responsabilidades. Escribe «Ninguna» si no tienes experiencia.",
            "type": "textarea",
            "required": true,
            "minLength": 10,
            "maxLength": 1200
          }
        ]
      },
      {
        "title": "Conocimientos de roleplay",
        "description": "Explica cada concepto con tus propias palabras. No copies definiciones de Internet.",
        "fields": [
          {
            "id": "mg",
            "label": "Explica qué es MG (Metagaming).",
            "type": "textarea",
            "required": true,
            "minLength": 20,
            "maxLength": 800
          },
          {
            "id": "pg",
            "label": "Explica qué es PG (Powergaming).",
            "type": "textarea",
            "required": true,
            "minLength": 20,
            "maxLength": 800
          },
          {
            "id": "dm",
            "label": "Explica qué es DM (Deathmatch).",
            "type": "textarea",
            "required": true,
            "minLength": 20,
            "maxLength": 800
          },
          {
            "id": "vdm",
            "label": "Explica qué es VDM (Vehicle Deathmatch).",
            "type": "textarea",
            "required": true,
            "minLength": 20,
            "maxLength": 800
          },
          {
            "id": "rk",
            "label": "Explica qué es RK (Revenge Kill).",
            "type": "textarea",
            "required": true,
            "minLength": 20,
            "maxLength": 800
          },
          {
            "id": "ck",
            "label": "Explica qué es CK (Character Kill).",
            "type": "textarea",
            "required": true,
            "minLength": 20,
            "maxLength": 800
          },
          {
            "id": "pk",
            "label": "Explica qué es PK (Player Kill).",
            "type": "textarea",
            "required": true,
            "minLength": 20,
            "maxLength": 800
          },
          {
            "id": "nre",
            "label": "Explica qué es NRE (No Roleplay de Entorno).",
            "type": "textarea",
            "required": true,
            "minLength": 20,
            "maxLength": 800
          },
          {
            "id": "ba",
            "label": "Explica qué es BA (Bug Abuse).",
            "type": "textarea",
            "required": true,
            "minLength": 20,
            "maxLength": 800
          },
          {
            "id": "ic_ooc",
            "label": "Explica la diferencia entre IC y OOC.",
            "type": "textarea",
            "required": true,
            "minLength": 25,
            "maxLength": 900
          }
        ]
      }
    ]
  },
  "police": {
    "title": "Postulación para Policía",
    "shortTitle": "Policía",
    "description": "Evaluación para ingresar al Departamento de Policía de Cruza2 Roleplay.",
    "icon": "🚓",
    "sections": [
      {
        "title": "Perfil y disponibilidad",
        "description": "Queremos conocer tu disponibilidad y tus herramientas para desempeñar el cargo.",
        "fields": [
          {
            "id": "discord_username",
            "label": "Nombre de usuario en Discord",
            "type": "text",
            "required": true,
            "maxLength": 60
          },
          {
            "id": "age",
            "label": "Edad",
            "type": "number",
            "required": true,
            "min": 13,
            "max": 80
          },
          {
            "id": "microphone",
            "label": "¿Tienes un micrófono funcional?",
            "type": "select",
            "required": true,
            "options": [
              "Sí",
              "No",
              "Con problemas ocasionales"
            ]
          },
          {
            "id": "active_schedule",
            "label": "¿En qué horario sueles estar conectado?",
            "type": "text",
            "required": true,
            "maxLength": 120
          },
          {
            "id": "daily_hours",
            "label": "¿Cuántas horas puedes dedicar diariamente al rol policial?",
            "type": "text",
            "required": true,
            "maxLength": 100
          }
        ]
      },
      {
        "title": "Conocimientos de roleplay",
        "description": "Responde con tus palabras y demuestra que comprendes cómo aplicar cada norma.",
        "fields": [
          {
            "id": "mg",
            "label": "¿Qué significa MG y cómo podría afectar un procedimiento policial?",
            "type": "textarea",
            "required": true,
            "minLength": 25,
            "maxLength": 900
          },
          {
            "id": "pg",
            "label": "¿Qué significa PG? Incluye un ejemplo relacionado con la policía.",
            "type": "textarea",
            "required": true,
            "minLength": 25,
            "maxLength": 900
          },
          {
            "id": "dm",
            "label": "¿Qué significa DM y cuándo una acción policial podría convertirse en DM?",
            "type": "textarea",
            "required": true,
            "minLength": 25,
            "maxLength": 900
          },
          {
            "id": "rk",
            "label": "¿Qué significa RK y cómo debe actuar un oficial después de morir en un rol?",
            "type": "textarea",
            "required": true,
            "minLength": 25,
            "maxLength": 900
          },
          {
            "id": "ic_ooc",
            "label": "Explica la diferencia entre IC y OOC dentro de una intervención policial.",
            "type": "textarea",
            "required": true,
            "minLength": 25,
            "maxLength": 900
          }
        ]
      },
      {
        "title": "Situaciones policiales",
        "description": "Describe cómo actuarías manteniendo el orden, la proporcionalidad y el roleplay.",
        "fields": [
          {
            "id": "vehicle_theft",
            "label": "Observas a una persona robando un vehículo. ¿Cómo iniciarías y desarrollarías la intervención?",
            "type": "textarea",
            "required": true,
            "minLength": 40,
            "maxLength": 1400
          },
          {
            "id": "suspect_flees",
            "label": "Un sospechoso huye después de recibir la orden de detenerse. ¿Cómo procederías?",
            "type": "textarea",
            "required": true,
            "minLength": 40,
            "maxLength": 1400
          },
          {
            "id": "partner_shoots",
            "label": "Un compañero comienza a disparar sin una razón válida. ¿Qué harías durante y después del incidente?",
            "type": "textarea",
            "required": true,
            "minLength": 40,
            "maxLength": 1400
          },
          {
            "id": "civil_insults",
            "label": "Durante un operativo, un civil insulta constantemente a los oficiales. ¿Cómo reaccionarías?",
            "type": "textarea",
            "required": true,
            "minLength": 40,
            "maxLength": 1400
          },
          {
            "id": "suspect_surrenders",
            "label": "Un sospechoso se rinde con las manos arriba. Explica el procedimiento que aplicarías.",
            "type": "textarea",
            "required": true,
            "minLength": 40,
            "maxLength": 1400
          }
        ]
      },
      {
        "title": "Actitud y compromiso",
        "description": "Explica por qué serías una buena incorporación para el departamento.",
        "fields": [
          {
            "id": "motivation",
            "label": "¿Por qué deseas formar parte del Departamento de Policía?",
            "type": "textarea",
            "required": true,
            "minLength": 40,
            "maxLength": 1400
          },
          {
            "id": "qualities",
            "label": "¿Qué cualidades debe tener un buen oficial dentro del roleplay?",
            "type": "textarea",
            "required": true,
            "minLength": 40,
            "maxLength": 1400
          },
          {
            "id": "friend_crime",
            "label": "¿Cómo actuarías si un amigo cercano comete un delito dentro del rol?",
            "type": "textarea",
            "required": true,
            "minLength": 40,
            "maxLength": 1400
          },
          {
            "id": "unknown_procedure",
            "label": "¿Qué harías si desconoces un procedimiento policial durante una situación activa?",
            "type": "textarea",
            "required": true,
            "minLength": 40,
            "maxLength": 1400
          },
          {
            "id": "why_accept",
            "label": "¿Por qué deberíamos aceptarte en el Departamento de Policía?",
            "type": "textarea",
            "required": true,
            "minLength": 50,
            "maxLength": 1600
          }
        ]
      }
    ]
  },
  "mechanic": {
    "title": "Postulación para Mecánico",
    "shortTitle": "Mecánico",
    "description": "Evaluación para formar parte del Taller Mecánico de Cruza2 Roleplay.",
    "icon": "🔧",
    "sections": [
      {
        "title": "Perfil y disponibilidad",
        "description": "Datos básicos para conocer tu disponibilidad y capacidad de comunicación.",
        "fields": [
          {
            "id": "discord_username",
            "label": "Nombre de usuario en Discord",
            "type": "text",
            "required": true,
            "maxLength": 60
          },
          {
            "id": "age",
            "label": "Edad",
            "type": "number",
            "required": true,
            "min": 13,
            "max": 80
          },
          {
            "id": "microphone",
            "label": "¿Tienes un micrófono funcional?",
            "type": "select",
            "required": true,
            "options": [
              "Sí",
              "No",
              "Con problemas ocasionales"
            ]
          },
          {
            "id": "active_schedule",
            "label": "¿En qué horario sueles estar conectado?",
            "type": "text",
            "required": true,
            "maxLength": 120
          },
          {
            "id": "daily_hours",
            "label": "¿Cuántas horas puedes dedicar diariamente al trabajo de mecánico?",
            "type": "text",
            "required": true,
            "maxLength": 100
          }
        ]
      },
      {
        "title": "Conocimientos de roleplay",
        "description": "Explica las normas y cómo se aplican dentro del taller.",
        "fields": [
          {
            "id": "mg",
            "label": "¿Qué significa MG y cómo evitarías cometerlo durante un servicio?",
            "type": "textarea",
            "required": true,
            "minLength": 25,
            "maxLength": 900
          },
          {
            "id": "pg",
            "label": "¿Qué significa PG? Incluye un ejemplo relacionado con una reparación.",
            "type": "textarea",
            "required": true,
            "minLength": 25,
            "maxLength": 900
          },
          {
            "id": "dm",
            "label": "¿Qué significa DM y cómo actuarías si ocurre dentro del taller?",
            "type": "textarea",
            "required": true,
            "minLength": 25,
            "maxLength": 900
          },
          {
            "id": "ic_ooc",
            "label": "Explica la diferencia entre IC y OOC durante la atención a un cliente.",
            "type": "textarea",
            "required": true,
            "minLength": 25,
            "maxLength": 900
          },
          {
            "id": "repair_without_role",
            "label": "Un cliente exige una reparación instantánea sin realizar el rol correspondiente. ¿Qué harías?",
            "type": "textarea",
            "required": true,
            "minLength": 35,
            "maxLength": 1200
          }
        ]
      },
      {
        "title": "Situaciones del taller",
        "description": "Demuestra organización, paciencia y atención profesional.",
        "fields": [
          {
            "id": "damaged_vehicle",
            "label": "Llega un cliente con el vehículo averiado. ¿Cuál sería tu primer paso y cómo continuarías?",
            "type": "textarea",
            "required": true,
            "minLength": 40,
            "maxLength": 1400
          },
          {
            "id": "no_money",
            "label": "El cliente no tiene dinero suficiente para pagar la reparación. ¿Cómo actuarías?",
            "type": "textarea",
            "required": true,
            "minLength": 40,
            "maxLength": 1400
          },
          {
            "id": "rushed_customer",
            "label": "Un jugador intenta apresurarte mientras realizas una reparación. ¿Cómo manejarías la situación?",
            "type": "textarea",
            "required": true,
            "minLength": 40,
            "maxLength": 1400
          },
          {
            "id": "many_customers",
            "label": "Tu compañero está ocupado y llegan varios clientes al mismo tiempo. ¿Cómo organizarías la atención?",
            "type": "textarea",
            "required": true,
            "minLength": 40,
            "maxLength": 1400
          },
          {
            "id": "disrespectful_customer",
            "label": "Un cliente te falta el respeto durante el servicio. ¿Cómo responderías?",
            "type": "textarea",
            "required": true,
            "minLength": 40,
            "maxLength": 1400
          }
        ]
      },
      {
        "title": "Actitud y compromiso",
        "description": "Cuéntanos cómo trabajarías con el equipo y con la comunidad.",
        "fields": [
          {
            "id": "motivation",
            "label": "¿Por qué quieres formar parte del Taller Mecánico?",
            "type": "textarea",
            "required": true,
            "minLength": 40,
            "maxLength": 1400
          },
          {
            "id": "qualities",
            "label": "¿Qué cualidades debe tener un buen mecánico?",
            "type": "textarea",
            "required": true,
            "minLength": 40,
            "maxLength": 1400
          },
          {
            "id": "teamwork",
            "label": "¿Te gusta trabajar en equipo? Explica cómo colaborarías con tus compañeros.",
            "type": "textarea",
            "required": true,
            "minLength": 40,
            "maxLength": 1400
          },
          {
            "id": "new_customer",
            "label": "¿Cómo orientarías a un cliente nuevo que desconoce el funcionamiento del taller?",
            "type": "textarea",
            "required": true,
            "minLength": 40,
            "maxLength": 1400
          },
          {
            "id": "why_accept",
            "label": "¿Por qué deberíamos aceptarte como mecánico en Cruza2 Roleplay?",
            "type": "textarea",
            "required": true,
            "minLength": 50,
            "maxLength": 1600
          }
        ]
      }
    ]
  },
  "ems": {
    "title": "Postulación para 911 / EMS",
    "shortTitle": "911 / EMS",
    "description": "Evaluación para integrarte al Servicio Médico de Emergencias.",
    "icon": "🚑",
    "sections": [
      {
        "title": "Perfil y disponibilidad",
        "description": "Datos básicos para conocer tu disponibilidad y capacidad de comunicación.",
        "fields": [
          {
            "id": "discord_username",
            "label": "Nombre de usuario en Discord",
            "type": "text",
            "required": true,
            "maxLength": 60
          },
          {
            "id": "age",
            "label": "Edad",
            "type": "number",
            "required": true,
            "min": 13,
            "max": 80
          },
          {
            "id": "microphone",
            "label": "¿Tienes un micrófono funcional?",
            "type": "select",
            "required": true,
            "options": [
              "Sí",
              "No",
              "Con problemas ocasionales"
            ]
          },
          {
            "id": "active_schedule",
            "label": "¿En qué horario sueles estar conectado?",
            "type": "text",
            "required": true,
            "maxLength": 120
          },
          {
            "id": "daily_hours",
            "label": "¿Cuántas horas puedes dedicar diariamente al rol de EMS?",
            "type": "text",
            "required": true,
            "maxLength": 100
          }
        ]
      },
      {
        "title": "Conocimientos de roleplay",
        "description": "Explica las normas y la responsabilidad de un servicio médico dentro del servidor.",
        "fields": [
          {
            "id": "mg",
            "label": "¿Qué significa MG y cómo podría afectar una atención médica?",
            "type": "textarea",
            "required": true,
            "minLength": 25,
            "maxLength": 900
          },
          {
            "id": "pg",
            "label": "¿Qué significa PG? Incluye un ejemplo relacionado con EMS.",
            "type": "textarea",
            "required": true,
            "minLength": 25,
            "maxLength": 900
          },
          {
            "id": "dm",
            "label": "¿Qué significa DM y cómo actuarías si ocurre durante una atención?",
            "type": "textarea",
            "required": true,
            "minLength": 25,
            "maxLength": 900
          },
          {
            "id": "ic_ooc",
            "label": "Explica la diferencia entre IC y OOC en una emergencia médica.",
            "type": "textarea",
            "required": true,
            "minLength": 25,
            "maxLength": 900
          },
          {
            "id": "medical_importance",
            "label": "¿Por qué es importante el rol médico dentro de un servidor de roleplay?",
            "type": "textarea",
            "required": true,
            "minLength": 40,
            "maxLength": 1200
          }
        ]
      },
      {
        "title": "Situaciones médicas",
        "description": "Describe cómo priorizarías la seguridad, la comunicación y la atención del paciente.",
        "fields": [
          {
            "id": "injured_scene",
            "label": "Llegas a una escena con una persona herida. ¿Qué haces primero y cómo continúas?",
            "type": "textarea",
            "required": true,
            "minLength": 40,
            "maxLength": 1400
          },
          {
            "id": "patient_insults",
            "label": "Un paciente insulta al personal mientras recibe atención. ¿Cómo actuarías?",
            "type": "textarea",
            "required": true,
            "minLength": 40,
            "maxLength": 1400
          },
          {
            "id": "active_shooting",
            "label": "Llegas a una zona donde todavía existe un tiroteo activo. ¿Cómo procederías?",
            "type": "textarea",
            "required": true,
            "minLength": 40,
            "maxLength": 1400
          },
          {
            "id": "partner_bad_role",
            "label": "Un compañero EMS realiza incorrectamente los procedimientos médicos. ¿Qué harías?",
            "type": "textarea",
            "required": true,
            "minLength": 40,
            "maxLength": 1400
          },
          {
            "id": "refuses_care",
            "label": "Un paciente consciente se niega a recibir atención médica. ¿Cómo manejarías la situación?",
            "type": "textarea",
            "required": true,
            "minLength": 40,
            "maxLength": 1400
          }
        ]
      },
      {
        "title": "Actitud y compromiso",
        "description": "Explica tu motivación y cómo responderías ante situaciones exigentes.",
        "fields": [
          {
            "id": "motivation",
            "label": "¿Por qué quieres formar parte del equipo EMS?",
            "type": "textarea",
            "required": true,
            "minLength": 40,
            "maxLength": 1400
          },
          {
            "id": "qualities",
            "label": "¿Qué cualidades debe tener un buen paramédico dentro del roleplay?",
            "type": "textarea",
            "required": true,
            "minLength": 40,
            "maxLength": 1400
          },
          {
            "id": "pressure",
            "label": "¿Sabes trabajar bajo presión? Explica cómo mantendrías el control en una emergencia complicada.",
            "type": "textarea",
            "required": true,
            "minLength": 40,
            "maxLength": 1400
          },
          {
            "id": "new_player",
            "label": "¿Cómo ayudarías a un jugador nuevo durante un rol médico sin romper la inmersión?",
            "type": "textarea",
            "required": true,
            "minLength": 40,
            "maxLength": 1400
          },
          {
            "id": "why_accept",
            "label": "¿Por qué deberíamos aceptarte en el Servicio Médico EMS?",
            "type": "textarea",
            "required": true,
            "minLength": 50,
            "maxLength": 1600
          }
        ]
      }
    ]
  }
};
