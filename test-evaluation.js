#!/usr/bin/env node
/**
 * CELPIP Writing Evaluation Test Suite
 * Run with: node test-evaluation.js
 * Tests various essay scenarios to validate AI evaluation accuracy
 */

const testCases = [
  {
    name: "Excellent Task 1 Email - High Score",
    essay: {
      task: {
        id: "task1",
        title: "Writing an Email",
        prompt: "You want to organize a surprise birthday party for your colleague. Write an email to other colleagues to ask for their participation.",
        wordLimit: { min: 150, max: 200 }
      },
      content: `Dear Team Members,

I hope this email finds you well. I am writing to invite you to participate in organizing a surprise birthday party for Sarah, whose birthday is next Friday, November 24th.

As you all know, Sarah has been an incredibly supportive colleague who always goes above and beyond to help us with our projects. I believe it would be wonderful to show our appreciation by celebrating this special occasion together.

I propose we organize the party in the conference room during lunch break from 12:00 PM to 1:00 PM. We would need contributions for decorations, cake, and small gifts. If you're interested in participating, please let me know by Wednesday so we can coordinate the arrangements properly.

I would also appreciate any ideas you might have for making this celebration memorable for Sarah. Please respond to this email with your availability and willingness to contribute.

Thank you for your time and consideration.

Best regards,
Alex Johnson`,
      wordCount: 154
    }
  },
  
  {
    name: "Poor Task 1 Email - Low Score", 
    essay: {
      task: {
        id: "task1",
        title: "Writing an Email",
        prompt: "You missed an important meeting at work. Write an email to your supervisor to explain and apologize.",
        wordLimit: { min: 150, max: 200 }
      },
      content: `Hi boss,

Sorry I miss meeting. I was sick and couldn't came to work. My head hurt very much and I feel very bad. I know meeting was important but I really sick.

I hope you understand. I will do better next time. Please tell me what happen in meeting.

Thanks.`,
      wordCount: 47
    }
  },

  {
    name: "Good Task 2 Opinion Essay",
    essay: {
      task: {
        id: "task2", 
        title: "Responding to Survey Questions",
        prompt: "Some people believe that social media has a positive impact on society, while others think it has a negative impact. What is your opinion? Explain your reasons.",
        wordLimit: { min: 250, max: 300 }
      },
      content: `In my opinion, social media has both positive and negative impacts on society, but I believe the benefits outweigh the drawbacks when used responsibly.

On the positive side, social media has revolutionized communication and connectivity. It allows people to maintain relationships across distances, reconnect with old friends, and build communities around shared interests. For instance, during the COVID-19 pandemic, social media platforms enabled people to stay connected when physical meetings were impossible. Additionally, social media has democratized information sharing, giving voice to marginalized communities and enabling rapid dissemination of important news and awareness campaigns.

However, I acknowledge that social media also presents significant challenges. These platforms can become breeding grounds for misinformation, cyberbullying, and unhealthy social comparisons. Many users, particularly young people, experience anxiety and depression related to social media use. The addictive nature of these platforms can also lead to decreased productivity and real-world social skills.

Despite these concerns, I maintain that social media's positive impact is greater. The key lies in digital literacy and responsible usage. When people are educated about online safety, fact-checking, and maintaining healthy boundaries, social media becomes a powerful tool for connection, learning, and social progress.

In conclusion, while social media requires careful navigation, its ability to connect people, share knowledge, and create positive social change makes it a valuable addition to modern society.`,
      wordCount: 267
    }
  },

  {
    name: "Average Task 2 with Grammar Issues",
    essay: {
      task: {
        id: "task2",
        title: "Responding to Survey Questions", 
        prompt: "Do you think schools should require students to wear uniforms? Give your opinion with reasons.",
        wordLimit: { min: 250, max: 300 }
      },
      content: `I think school uniforms is good idea for many reasons. First reason is that uniforms make all student look same so there is no discrimination based on clothes. Rich students and poor students wear same thing so nobody feel bad about their clothes.

Second reasons is that uniforms make students more focus on study instead of thinking about what to wear every morning. This save time and reduce stress for students and parents. Parents don't need to spend lot of money buying fashionable clothes for their children.

Also, uniforms create sense of unity and belonging to school. When students wear same clothes, they feel they are part of same community. This can improve school spirit and reduce bullying.

However, some people think uniforms restrict student's freedom of expression. They believe students should be able to express their personality through clothes. This is valid concern but I think there are other ways to express personality like through art, sports, and academic achievement.

Another disadvantage is cost. Some families might find it expensive to buy uniforms, especially if they have many children. But in long term, uniforms are more economical than buying different clothes.

In conclusion, I believe benefits of school uniforms outweigh disadvantages. Uniforms promote equality, focus on education, and create better learning environment.`,
      wordCount: 251
    }
  }
];

async function testEvaluation(testCase) {
  console.log(`\n🧪 Testing: ${testCase.name}`);
  console.log(`📝 Essay word count: ${testCase.essay.wordCount}`);
  console.log(`📋 Task: ${testCase.essay.task.title}`);
  
  try {
    const response = await fetch('https://celpip-writing-coach.netlify.app/.netlify/functions/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ essay: testCase.essay })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const feedback = await response.json();
    
    console.log(`\n📊 RESULTS:`);
    console.log(`   Content & Coherence: ${feedback.scores.content}/12`);
    console.log(`   Vocabulary: ${feedback.scores.vocabulary}/12`);
    console.log(`   Readability: ${feedback.scores.readability}/12`);
    console.log(`   Task Fulfillment: ${feedback.scores.taskFulfillment}/12`);
    console.log(`   Overall Score: ${feedback.overallScore}/12`);
    
    console.log(`\n💡 RECOMMENDATIONS:`);
    feedback.recommendations.forEach((rec, index) => {
      console.log(`   ${index + 1}. ${rec}`);
    });
    
    if (feedback.corrections.length > 0) {
      console.log(`\n✏️  CORRECTIONS:`);
      feedback.corrections.slice(0, 2).forEach((corr, index) => {
        console.log(`   ${index + 1}. "${corr.original}" → "${corr.corrected}"`);
        console.log(`      Reason: ${corr.explanation}`);
      });
    }

    return feedback;
  } catch (error) {
    console.error(`❌ Error testing ${testCase.name}:`, error.message);
    return null;
  }
}

async function runAllTests() {
  console.log('🚀 CELPIP Writing Evaluation Test Suite');
  console.log('=====================================');
  
  const results = [];
  
  for (const testCase of testCases) {
    const result = await testEvaluation(testCase);
    results.push({ name: testCase.name, result });
    
    // Wait 2 seconds between tests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('\n📋 SUMMARY:');
  console.log('=============');
  results.forEach(({ name, result }) => {
    if (result) {
      console.log(`✅ ${name}: Overall Score ${result.overallScore}/12`);
    } else {
      console.log(`❌ ${name}: Failed to evaluate`);
    }
  });
}

// Run tests if called directly
if (require.main === module) {
  runAllTests().catch(console.error);
}

module.exports = { testCases, testEvaluation, runAllTests };
