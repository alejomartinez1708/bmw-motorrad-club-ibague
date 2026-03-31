import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://bijrcagksnlwqqlwjfsh.supabase.co'
const SUPABASE_KEY = 'sb_publishable_WcliOZsnBmAqwPyE867c8Q_u2ojmu5H'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
