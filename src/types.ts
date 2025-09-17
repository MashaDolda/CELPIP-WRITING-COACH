export interface TaskType {
  id: 'task1' | 'task2' | 'task3' | 'task4' | 'task5' | 'task6' | 'task7' | 'task8' | 'task9' | 'task10' | 'task11' | 'task12' | 'task13' | 'task14' | 'task15' | 'task16' | 'task17' | 'task18' | 'custom';
  title: string;
  description: string;
  prompt: string;
  timeLimit: number; // in minutes
  wordLimit: { min: number; max: number };
  type?: 'email' | 'survey' | 'custom';
  customImage?: string; // For uploaded task images
}

export interface EssayData {
  task: TaskType;
  content: string;
  wordCount: number;
  timeSpent: number; // in seconds
}

export interface FeedbackScores {
  content: number; // 0-12 scale
  vocabulary: number;
  readability: number;
  taskFulfillment: number;
}

export interface Correction {
  original: string;
  corrected: string;
  explanation: string;
}

export interface FeedbackData {
  scores: FeedbackScores;
  overallScore: number;
  recommendations: string[];
  corrections: Correction[];
}

// New CLB-based feedback format
export interface CriterionAnalysis {
  celpipScore: number; // 0-12 scale
  clbLevel: number; // 1-12 CLB level
  analysis: string;
  improvementToNextLevel: string;
}

export interface CLBFeedbackData {
  overallCLB: number;
  criteriaAnalysis: {
    content: CriterionAnalysis;
    vocabulary: CriterionAnalysis;
    readability: CriterionAnalysis;
    taskFulfillment: CriterionAnalysis;
  };
  keyCorrections: Correction[];
}

export const TASK_PROMPTS = {
  task1: {
    en: "You received an email from a friend who is planning to visit your city. Write an email response (150-200 words) that includes:\n\n• Welcome them to your city\n• Suggest 2-3 places they should visit\n• Offer to help with their trip planning\n• Ask about their arrival date and duration of stay",
    ru: "Вы получили письмо от друга, который планирует посетить ваш город. Напишите ответное письмо (150-200 слов), которое включает:\n\n• Приветствие в вашем городе\n• Предложение 2-3 места, которые стоит посетить\n• Предложение помочь с планированием поездки\n• Вопрос о дате прибытия и продолжительности пребывания",
    uk: "Ви отримали лист від друга, який планує відвідати ваше місто. Напишіть відповідного листа (150-200 слів), який включає:\n\n• Привітання у вашому місті\n• Пропозицію 2-3 місця, які варто відвідати\n• Пропозицію допомогти з плануванням подорожі\n• Питання про дату прибуття та тривалість перебування"
  },
  task2: {
    en: "Some people believe that social media has more negative effects than positive effects on society. Others disagree.\n\nWhat is your opinion? Explain your position with specific examples and reasons. (250-300 words)",
    ru: "Некоторые люди считают, что социальные сети оказывают больше негативного влияния на общество, чем позитивного. Другие с этим не согласны.\n\nКакое ваше мнение? Объясните свою позицию с конкретными примерами и причинами. (250-300 слов)",
    uk: "Деякі люди вважають, що соціальні мережі мають більше негативних наслідків, ніж позитивних для суспільства. Інші з цим не погоджуються.\n\nЯка ваша думка? Поясніть свою позицію з конкретними прикладами та причинами. (250-300 слів)"
  },
  task3: {
    en: "You missed an important meeting at work due to a family emergency. Write an email to your supervisor (150-200 words) that includes:\n\n• Apologize for missing the meeting\n• Briefly explain the reason\n• Ask about key decisions made\n• Offer to make up for missed work",
    ru: "Вы пропустили важную встречу на работе из-за семейной экстренной ситуации. Напишите письмо своему руководителю (150-200 слов), которое включает:\n\n• Извинение за пропуск встречи\n• Краткое объяснение причины\n• Вопрос о ключевых принятых решениях\n• Предложение компенсировать пропущенную работу",
    uk: "Ви пропустили важливу зустріч на роботі через сімейну надзвичайну ситуацію. Напишіть лист своєму керівнику (150-200 слів), який включає:\n\n• Вибачення за пропуск зустрічі\n• Коротке пояснення причини\n• Питання про ключові прийняті рішення\n• Пропозицію компенсувати пропущену роботу"
  },
  task4: {
    en: "You want to join a local sports team but have no prior experience. Write an email to the team coach (150-200 words) that includes:\n\n• Express your interest in joining\n• Explain your fitness level and motivation\n• Ask about training schedule and requirements\n• Request a trial session",
    ru: "Вы хотите присоединиться к местной спортивной команде, но у вас нет предыдущего опыта. Напишите письмо тренеру команды (150-200 слов), которое включает:\n\n• Выражение интереса к присоединению\n• Объяснение вашего уровня физической подготовки и мотивации\n• Вопросы о расписании тренировок и требованиях\n• Просьба о пробной тренировке",
    uk: "Ви хочете приєднатися до місцевої спортивної команди, але у вас немає попереднього досвіду. Напишіть лист тренеру команди (150-200 слів), який включає:\n\n• Вираження інтересу до приєднання\n• Пояснення вашого рівня фізичної підготовки та мотивації\n• Питання про розклад тренувань та вимоги\n• Прохання про пробне тренування"
  },
  task5: {
    en: "Some people think that students should choose their own subjects in school, while others believe that everyone should study the same core subjects.\n\nWhat is your opinion? Support your answer with specific examples and reasons. (250-300 words)",
    ru: "Некоторые люди думают, что студенты должны выбирать свои собственные предметы в школе, в то время как другие считают, что все должны изучать одинаковые основные предметы.\n\nКакое ваше мнение? Подкрепите свой ответ конкретными примерами и причинами. (250-300 слов)",
    uk: "Деякі люди думають, що студенти повинні вибирати свої власні предмети в школі, тоді як інші вважають, що всі повинні вивчати однакові основні предмети.\n\nЯка ваша думка? Підкріпіть свою відповідь конкретними прикладами та причинами. (250-300 слів)"
  },
  task6: {
    en: "The city wants to build either a new shopping mall or a public park in your neighborhood. Citizens can vote on which option they prefer.\n\nWhich option would you choose? Explain your reasons with specific examples. (250-300 words)",
    ru: "Город хочет построить либо новый торговый центр, либо общественный парк в вашем районе. Граждане могут голосовать за тот вариант, который они предпочитают.\n\nКакой вариант вы бы выбрали? Объясните свои причины конкретными примерами. (250-300 слов)",
    uk: "Місто хоче побудувати або новий торговий центр, або громадський парк у вашому районі. Громадяни можуть голосувати за той варіант, який вони віддають перевагу.\n\nЯкий варіант ви б обрали? Поясніть свої причини конкретними прикладами. (250-300 слів)"
  },
  task7: {
    en: "You are unhappy with the service you received at a restaurant last weekend. Write an email to the restaurant manager (150-200 words) that includes:\n\n• Describe what happened during your visit\n• Explain how this affected your experience\n• Request appropriate compensation\n• Give them a chance to make it right",
    ru: "Вы недовольны обслуживанием, которое получили в ресторане на прошлых выходных. Напишите письмо менеджеру ресторана (150-200 слов), которое включает:\n\n• Опишите, что произошло во время вашего визита\n• Объясните, как это повлияло на ваш опыт\n• Запросите соответствующую компенсацию\n• Дайте им шанс все исправить",
    uk: "Ви незадоволені обслуговуванням, яке отримали в ресторані минулих вихідних. Напишіть лист менеджеру ресторану (150-200 слів), який включає:\n\n• Опишіть, що сталося під час вашого відвідування\n• Поясніть, як це вплинуло на ваш досвід\n• Запросіть відповідну компенсацію\n• Дайте їм шанс все виправити"
  },
  task8: {
    en: "Your gym membership is expiring soon and you want to cancel it instead of renewing. Write an email to the gym management (150-200 words) that includes:\n\n• State your intention to cancel membership\n• Explain your reasons for canceling\n• Ask about the cancellation process\n• Request confirmation of cancellation",
    ru: "Ваше членство в спортзале скоро истекает, и вы хотите его отменить вместо продления. Напишите письмо руководству спортзала (150-200 слов), которое включает:\n\n• Заявите о своем намерении отменить членство\n• Объясните причины отмены\n• Спросите о процессе отмены\n• Запросите подтверждение отмены",
    uk: "Ваше членство в спортзалі незабаром закінчується, і ви хочете його скасувати замість продовження. Напишіть лист керівництву спортзалу (150-200 слів), який включає:\n\n• Заявіть про свій намір скасувати членство\n• Поясніть причини скасування\n• Запитайте про процес скасування\n• Запросіть підтвердження скасування"
  },
  task9: {
    en: "You recently moved to a new apartment and are having problems with noisy neighbors. Write an email to your landlord (150-200 words) that includes:\n\n• Describe the noise problems you're experiencing\n• Explain how it affects your daily life\n• Request the landlord's assistance\n• Suggest possible solutions",
    ru: "Вы недавно переехали в новую квартиру и у вас проблемы с шумными соседями. Напишите письмо своему арендодателю (150-200 слов), которое включает:\n\n• Опишите проблемы с шумом, которые вы испытываете\n• Объясните, как это влияет на вашу повседневную жизнь\n• Попросите помощи арендодателя\n• Предложите возможные решения",
    uk: "Ви нещодавно переїхали в нову квартиру і маєте проблеми з шумними сусідами. Напишіть лист своєму орендодавцю (150-200 слів), який включає:\n\n• Опишіть проблеми з шумом, які ви відчуваєте\n• Поясніть, як це впливає на ваше повсякденне життя\n• Попросіть допомоги орендодавця\n• Запропонуйте можливі рішення"
  },
  task10: {
    en: "You want to apply for a part-time job at a local bookstore that you saw advertised. Write an email to the store manager (150-200 words) that includes:\n\n• Express your interest in the position\n• Highlight your relevant experience and skills\n• Mention your availability\n• Request an interview",
    ru: "Вы хотите подать заявку на работу с частичной занятостью в местном книжном магазине, которую вы увидели в рекламе. Напишите письмо менеджеру магазина (150-200 слов), которое включает:\n\n• Выразите интерес к должности\n• Подчеркните свой соответствующий опыт и навыки\n• Упомяните свою доступность\n• Попросите собеседование",
    uk: "Ви хочете подати заявку на роботу з частковою зайнятістю в місцевому книжковому магазині, яку ви побачили в рекламі. Напишіть лист менеджеру магазину (150-200 слів), який включає:\n\n• Виразіть інтерес до посади\n• Підкресліть свій відповідний досвід та навички\n• Згадайте свою доступність\n• Попросіть співбесіду"
  },
  task11: {
    en: "Your child's school is planning to eliminate music and art programs due to budget cuts. Write an email to the school principal (150-200 words) that includes:\n\n• Express your concern about the program cuts\n• Explain the importance of arts education\n• Suggest alternative solutions\n• Request a meeting to discuss the issue",
    ru: "Школа вашего ребенка планирует отменить музыкальные и художественные программы из-за сокращения бюджета. Напишите письмо директору школы (150-200 слов), которое включает:\n\n• Выразите обеспокоенность сокращением программ\n• Объясните важность художественного образования\n• Предложите альтернативные решения\n• Попросите встречу для обсуждения вопроса",
    uk: "Школа вашої дитини планує скасувати музичні та художні програми через скорочення бюджету. Напишіть лист директору школи (150-200 слів), який включає:\n\n• Виразіть стурбованість скороченням програм\n• Поясніть важливість мистецької освіти\n• Запропонуйте альтернативні рішення\n• Попросіть зустріч для обговорення питання"
  },
  task12: {
    en: "You ordered a laptop online but received a damaged product. Write an email to customer service (150-200 words) that includes:\n\n• Describe the damage you found\n• Include your order information\n• Request a replacement or refund\n• Ask about the return process",
    ru: "Вы заказали ноутбук онлайн, но получили поврежденный товар. Напишите письмо в службу поддержки клиентов (150-200 слов), которое включает:\n\n• Опишите обнаруженные повреждения\n• Включите информацию о вашем заказе\n• Запросите замену или возврат\n• Спросите о процессе возврата",
    uk: "Ви замовили ноутбук онлайн, але отримали пошкоджений товар. Напишіть лист в службу підтримки клієнтів (150-200 слів), який включає:\n\n• Опишіть виявлені пошкодження\n• Включіть інформацію про ваше замовлення\n• Запросіть заміну або повернення\n• Запитайте про процес повернення"
  },
  task13: {
    en: "Some people believe that working from home is more productive than working in an office, while others think office work is better for productivity and collaboration.\n\nWhat is your opinion? Support your answer with specific examples and reasons. (250-300 words)",
    ru: "Некоторые люди считают, что работа из дома более продуктивна, чем работа в офисе, в то время как другие думают, что офисная работа лучше для продуктивности и сотрудничества.\n\nКакое ваше мнение? Подкрепите свой ответ конкретными примерами и причинами. (250-300 слов)",
    uk: "Деякі люди вважають, що робота з дому більш продуктивна, ніж робота в офісі, тоді як інші думають, що офісна робота краще для продуктивності та співпраці.\n\nЯка ваша думка? Підкріпіть свою відповідь конкретними прикладами та причинами. (250-300 слів)"
  },
  task14: {
    en: "The city council is considering implementing a bike-sharing program to reduce traffic congestion and promote environmental sustainability. Some residents support this initiative, while others have concerns about cost and practicality.\n\nWhat is your opinion on bike-sharing programs? Explain your reasons with specific examples. (250-300 words)",
    ru: "Городской совет рассматривает возможность внедрения программы проката велосипедов для уменьшения дорожных пробок и продвижения экологической устойчивости. Некоторые жители поддерживают эту инициативу, в то время как у других есть опасения по поводу стоимости и практичности.\n\nКакое ваше мнение о программах проката велосипедов? Объясните свои причины конкретными примерами. (250-300 слов)",
    uk: "Міська рада розглядає можливість впровадження програми прокату велосипедів для зменшення дорожніх заторів та просування екологічної стійкості. Деякі мешканці підтримують цю ініціативу, тоді як інші мають занепокоєння щодо вартості та практичності.\n\nЯка ваша думка про програми прокату велосипедів? Поясніть свої причини конкретними прикладами. (250-300 слів)"
  },
  task15: {
    en: "Many companies are now offering mental health days as part of their employee benefits package. Some believe this is essential for worker wellbeing, while others think it could be misused or affect productivity.\n\nDo you think companies should provide mental health days? Give your opinion with reasons and examples. (250-300 words)",
    ru: "Многие компании теперь предлагают дни психического здоровья как часть своего пакета льгот для сотрудников. Некоторые считают, что это важно для благополучия работников, в то время как другие думают, что это может быть неправильно использовано или повлиять на продуктивность.\n\nДумаете ли вы, что компании должны предоставлять дни психического здоровья? Дайте свое мнение с причинами и примерами. (250-300 слов)",
    uk: "Багато компаній тепер пропонують дні психічного здоров'я як частину свого пакету пільг для співробітників. Деякі вважають, що це важливо для благополуччя працівників, тоді як інші думають, що це може бути неправильно використано або вплинути на продуктивність.\n\nЧи думаєте ви, що компанії повинні надавати дні психічного здоров'я? Дайте свою думку з причинами та прикладами. (250-300 слів)"
  },
  task16: {
    en: "Some people prefer to shop at large chain stores and online retailers for convenience and lower prices, while others prefer to support small local businesses even if they cost more.\n\nWhere do you prefer to shop? Explain your choice with specific reasons and examples. (250-300 words)",
    ru: "Некоторые люди предпочитают делать покупки в крупных сетевых магазинах и интернет-магазинах из-за удобства и низких цен, в то время как другие предпочитают поддерживать малый местный бизнес, даже если он стоит дороже.\n\nГде вы предпочитаете делать покупки? Объясните свой выбор конкретными причинами и примерами. (250-300 слов)",
    uk: "Деякі люди віддають перевагу покупкам у великих мережевих магазинах та інтернет-магазинах через зручність та нижчі ціни, тоді як інші віддають перевагу підтримці малого місцевого бізнесу, навіть якщо він коштує дорожче.\n\nДе ви віддаєте перевагу робити покупки? Поясніть свій вибір конкретними причинами та прикладами. (250-300 слів)"
  },
  task17: {
    en: "The government is considering making public transportation completely free to encourage more people to use it and reduce environmental pollution. However, this would require significant tax increases to fund the program.\n\nDo you support free public transportation? Explain your position with reasons and examples. (250-300 words)",
    ru: "Правительство рассматривает возможность сделать общественный транспорт полностью бесплатным, чтобы побудить больше людей использовать его и уменьшить загрязнение окружающей среды. Однако это потребует значительного повышения налогов для финансирования программы.\n\nПоддерживаете ли вы бесплатный общественный транспорт? Объясните свою позицию с причинами и примерами. (250-300 слов)",
    uk: "Уряд розглядає можливість зробити громадський транспорт повністю безкоштовним, щоб заохотити більше людей використовувати його та зменшити забруднення довкілля. Однак це вимагатиме значного підвищення податків для фінансування програми.\n\nЧи підтримуєте ви безкоштовний громадський транспорт? Поясніть свою позицію з причинами та прикладами. (250-300 слів)"
  },
  task18: {
    en: "Many schools are considering extending the school day to include more academic instruction and extracurricular activities. Supporters say it helps working parents and improves student achievement, while critics worry about student burnout and family time.\n\nWhat is your opinion on extending school hours? Support your answer with specific reasons and examples. (250-300 words)",
    ru: "Многие школы рассматривают возможность продления учебного дня, чтобы включить больше академических занятий и внеклассных мероприятий. Сторонники говорят, что это помогает работающим родителям и улучшает успеваемость учеников, в то время как критики беспокоятся о выгорании учеников и семейном времени.\n\nКакое ваше мнение о продлении школьных часов? Подкрепите свой ответ конкретными причинами и примерами. (250-300 слов)",
    uk: "Багато шкіл розглядають можливість подовження навчального дня, щоб включити більше академічних занять та позакласних заходів. Прихильники кажуть, що це допомагає працюючим батькам та покращує успішність учнів, тоді як критики турбуються про вигорання учнів та сімейний час.\n\nЯка ваша думка про подовження шкільних годин? Підкріпіть свою відповідь конкретними причинами та прикладами. (250-300 слів)"
  },
  custom: {
    en: "Upload your own CELPIP task image and write your response based on the provided prompt.",
    ru: "Загрузите изображение своего задания CELPIP и напишите ответ на основе предоставленного задания.",
    uk: "Завантажте зображення свого завдання CELPIP і напишіть відповідь на основі наданого завдання."
  }
};
