//storage/leadsRepo.js
import { supabase, logger } from '../config/tools.js';

/**
 * Insrts a new lead into the supabase database.
 * @param {Object} lead - Lead object to insert
 * @returns {Promise<Object>} inserted lead data
 * @throes {Error} if insert fails
 */

export async function insertLead(lead) {
    try {
        const {data, error} = await supabase
            .from('leads')
            .insert([ { ...lead } ]) //avoid mutation
            .select()
            .single();

        if (error) {
            throw new Error(`Insert failed: ${error.message}`);
        }

        return data;

    } catch (err) {
        logger.error('insertLead failed', { message: err.message, lead })
        throw err;
    }
}

/**
 * Inserts or updates a lead based on unique constraints
 * @param {Object} lead - lead object to upsert
 * @return {Promise<Object>} upserted lead data
 * @throws {Error} if upsert fails
 */

export async function upsertLead(lead) {
    try {
        const { data, error } = await supabase
            .from('leads')
            .upsert([ { ...lead } ], { onConflict: "email"})
            .select()
            .single();
        if (error) {
            throw new Error(`Upsert failed: ${error.message}`);
        }

        return data;
    } catch (err) {
        logger.error('upsertLead failed', { message: err.message, lead })
        throw err;
    }
}

/**
 * Retrieves leads by status from the supabase database.
 * @param {string} status - Status to filter leads by
 * @returns {Promise<Array>} array of leads
 * @throws {Error} if retrieval fails
 */

export async function getLeadByStatus(status) {
    try {
        const { data, error } = await supabase
            .from('leads')
            .select()
            .eq('status', status);

        if (error) {
            throw new Error(`Fetch failed: ${error.message}`);
        }

        return data;

    } catch (err) {
        logger.error('getLeadByStatus failed', { message: err.message, status })
        throw err;
    }
}

/**
 * Marks a lead as sucessfully sent
 * @param {string} leadId - lead ID
 * @param {string} messageId - Email/message ID
 * @return {Promise<Object>} updated lead data
 * @throws {Error} if update fails
 */

export async function markSent(leadId, messageId) {
    try {
        const { data, error } = await supabase
            .from('leads')
            .update({ 
                status: 'sent', 
                email_message_id: messageId,
                email_sent_at: new Date().toISOString() 
            })
            .eq('lead_id', leadId)

            if (error) {
                throw new Error(`markSent failed: ${error.message}`);
            }

            return true;
        } catch (err) {
            logger.error('markSent failed', { message: err.message, leadId, messageId });
            throw err;
    }
}

/**
 * Marks a lead as failed
 * @param {string} leadId - Lead ID
 * @param {string} errorMessage - Failure reason
 * @returns {Promise<boolean>} true if update succeeds
 * @throws {Error} if update fails
 */
export async function markFailed(leadId, errorMessage) {
  try {
    const { error } = await supabase
      .from('leads')
      .update({
        status: 'email_failed',
        notes: errorMessage
      })
      .eq('lead_id', leadId);

    if (error) {
      throw new Error(`markFailed failed: ${error.message}`);
    }

    return true;

  } catch (err) {
    logger.error('markFailed failed', {
      message: err.message,
      leadId,
      errorMessage
    });

    throw err;
  }
}