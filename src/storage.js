const { createClient } = require('@supabase/supabase-js');

let client;
function bucket() {
  if (!client) {
    client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
  }
  return client.storage.from('attachments');
}

module.exports = { bucket };