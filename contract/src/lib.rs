/*
 * This is an example of a Rust smart contract with two simple, symmetric functions:
 *
 * 1. set_greeting: accepts a greeting, such as "howdy", and records it for the user (account_id)
 *    who sent the request
 * 2. get_greeting: accepts an account_id and returns the greeting saved for it, defaulting to
 *    "Hello"
 *
 * Learn more about writing NEAR smart contracts with Rust:
 * https://github.com/near/near-sdk-rs
 *
 */

// To conserve gas, efficient serialization is achieved through Borsh (http://borsh.io/)
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::wee_alloc;
use near_sdk::{env, near_bindgen};
use std::collections::HashMap;

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

// a thread where messages can be sent to 
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct Thread {
    pub messages: HashMap<String, String>,
    pub members: Vec<String>,
    pub topic: String
}

impl Thread {
    pub fn insert(&mut self, key: String, value: String) {
        self.messages.insert(key, value);
    }

    // add a member 
    pub fn add_member(&mut self, member: String){
        self.members.push(member)
    }
}


#[near_bindgen]
#[derive(Default, BorshSerialize, BorshDeserialize)]
pub struct Messages {
    threads: Vec<Thread>
}

static MAX_MSG_LENGTH: usize = 256;

#[near_bindgen]
impl Messages {
    /// filter the threads that a member belongs to 
    /// and return a list of all topics 
    pub fn get_threads(&self, member: String) -> Vec<String> {
        let threads: Vec<&Thread> = self.threads.iter()
            .filter(|t| {
                t.members.contains(&member)
            })
            .collect();

        let topics: Vec<String> = threads.iter()
            .map(|t| t.topic.clone())
            .collect();

        topics 
    }

    // send a message to a thread 
    pub fn send_message(&mut self, topic: String, message: String) -> Result<(), String>{
        if message.is_empty() {
            return Err("Message cannot be empty".into());
        }

        if message.len() > MAX_MSG_LENGTH{
            return Err(format!(
                "Message should not be more that {} characters",
                MAX_MSG_LENGTH
            ));
        }

        // choose a  thread to send it to 
        let thread = self.threads.iter_mut()
            .find(|t| t.topic == topic);

        let account_id = env::signer_account_id();

        if let Some(thread) = thread {
            // check if user is a member 
            if thread.members.contains(&account_id){
                thread.insert(account_id, message);
                Ok(())
            }else{
                return Err(format!(
                    "Only members can send messages to {} thread",
                    topic
                ));
            }
        }else{
            return Err("Thread does not exist".into());
        }
    }

    // get messages from a specific thread 
    pub fn get_messages(&self, topic: String) -> Result<Vec<(String, String)>, String>{
        let thread = self.threads.iter()
            .find(|t| t.topic == topic);

        if let Some(thread) = thread {
            let msgs: Vec<(String, String)> = thread.messages.iter()
                .map(|(sender, msg)| (sender.clone(), msg.clone()))
                .collect();

            Ok(msgs)
        }else{
            return Err(format!(
                "Thread {} not found",
                topic
            ))
        }
    }

    // create a new thread 
    pub fn new_thread(&mut self, topic: String) -> Result<(), String>{
        let thread = self.threads.iter()
            .find(|t| t.topic == topic);

        if let Some(_) = thread {
            return Err(format!(
                "A thread with {} name exists",
                topic
            ));
        }

        let account_id = env::signer_account_id();

        let new_thread = Thread {
            messages: HashMap::new(),
            members: vec![account_id],
            topic
        };

        self.threads.push(new_thread);

        Ok(())

    }

    // invite an account to a thread 
    pub fn invite(&mut self, topic: String, account_id: String) -> Result<(), String>{
        let thread = self.threads.iter_mut()
            .find(|t| t.topic == topic);

        if let Some(t) = thread{
            t.add_member(account_id);
            Ok(())
        }else{
            return Err(format!(
                "Thread {} does not exist",
                topic
            ))
        }
    }
}
