use env::log;
// To conserve gas, efficient serialization is achieved through Borsh (http://borsh.io/)
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::wee_alloc;
use near_sdk::{env, near_bindgen};
use std::time::SystemTime;
use chrono::offset::Local;
use chrono::DateTime;


#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;


// message type 
#[derive(Default,BorshDeserialize, BorshSerialize, Clone)]
pub struct Message {
    pub message: String,
    pub sender: String,
    pub ts: String
}

impl Message {
    pub fn new(message: String, sender: String) -> Self {
        let now = SystemTime::now();
        let datetime: DateTime<Local> = now.into();
        let ts: String = format!("{}", datetime.format("%d/%m/%Y %T"));
        
        Self {
            message,
            sender,
            ts
        }
    }
}
// a thread where messages can be sent to 
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct Thread {
    pub messages: Vec<Message>,
    pub members: Vec<String>,
    pub topic: String
}

impl Thread {
    pub fn insert(&mut self, msg: Message) {
        self.messages.push(msg);
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

    /// get the members of a thread 
    pub fn get_members(&self, thread: String) -> Vec<String> {
        // check if the thread is available 
        let thread = self.threads.iter()
            .find(|t| t.topic == thread);

        if let Some(thread) = thread {
            log(b"thread found");

            return thread.members.clone();
        }
        
        vec![]
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
                let new_message = Message::new(message, account_id);

                thread.insert(new_message);
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
            Ok(thread.messages.clone())
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
            messages: vec![],
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
