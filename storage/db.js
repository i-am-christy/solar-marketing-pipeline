// storage/db.js
import { supabase, logger } from '../config/tools.js';

/**
 * Tests the Supabase connection
 * @returns {Promise<boolean>} true if connection is healthy
 * @throws {Error} if connection fails 
 */

export async function testConnection() {
    try {
        //lightweight test query
        const { data, error } = await supabase
            .from('leads')
            .select('lead_id')
            .limit(1);
        if (error) {
            throw new Error(`Supabase verification failed: ${error.message}`);
        }

    return true;

    } catch (err) {
        logger.error('Supabase connection error', { 
            message: err.message 
        });

        throw err;
    }
}

export { supabase };