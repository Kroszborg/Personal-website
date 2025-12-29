// Quick test script to verify Telegram setup
const TELEGRAM_BOT_TOKEN = '8413364815:AAEdNkguuo6T7ut0r7Xd-6_8ehtp7QECck8';
const TELEGRAM_CHAT_ID = '7696777908';

async function testTelegram() {
  console.log('🔍 Testing Telegram Bot Setup...\n');

  // Test 1: Check bot info
  console.log('1️⃣ Checking bot status...');
  const botInfoResponse = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`,
  );
  const botInfo = await botInfoResponse.json();

  if (botInfo.ok) {
    console.log('✅ Bot is active!');
    console.log(`   Name: ${botInfo.result.first_name}`);
    console.log(`   Username: @${botInfo.result.username}\n`);
  } else {
    console.log('❌ Bot token is invalid!\n');
    return;
  }

  // Test 2: Check for recent messages
  console.log('2️⃣ Checking for messages...');
  const updatesResponse = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`,
  );
  const updates = await updatesResponse.json();

  if (updates.ok && updates.result.length > 0) {
    console.log('✅ Found messages!');
    const lastMessage = updates.result[updates.result.length - 1];
    const correctChatId = lastMessage.message.chat.id;
    console.log(`   Your correct Chat ID: ${correctChatId}`);

    if (correctChatId.toString() === TELEGRAM_CHAT_ID) {
      console.log('   ✅ Chat ID in .env is CORRECT!\n');
    } else {
      console.log(`   ⚠️  Chat ID in .env is WRONG!`);
      console.log(`   Current .env value: ${TELEGRAM_CHAT_ID}`);
      console.log(`   Should be: ${correctChatId}\n`);
    }
  } else {
    console.log('❌ No messages found!');
    console.log('   👉 Go to Telegram and search for @kroszborgbot');
    console.log('   👉 Click START and send a message');
    console.log('   👉 Then run this script again\n');
    return;
  }

  // Test 3: Try sending a test message
  console.log('3️⃣ Sending test message...');
  const testMessage =
    '🎉 Contact form is working! This is a test message from your portfolio.';

  const sendResponse = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: testMessage,
      }),
    },
  );

  const sendResult = await sendResponse.json();

  if (sendResult.ok) {
    console.log('✅ Test message sent successfully!');
    console.log('   Check your Telegram - you should see the test message\n');
    console.log(
      '🎉 EVERYTHING IS WORKING! Your contact form should work now.\n',
    );
  } else {
    console.log('❌ Failed to send message!');
    console.log(`   Error: ${sendResult.description}\n`);
  }
}

testTelegram().catch(console.error);
