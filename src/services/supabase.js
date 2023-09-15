import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
const supabaseUrl = "https://kpglxniieryhzbmizfri.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwZ2x4bmlpZXJ5aHpibWl6ZnJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk3NDk3MDksImV4cCI6MjAwNTMyNTcwOX0.dAMxEm-ZINrF8kvV62QGfKhXkD6q05QSlVgOpJvNI7Q";
const supabase = createClient(supabaseUrl, supabaseKey, {
	auth: {
		storage: AsyncStorage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
});
export default supabase;
