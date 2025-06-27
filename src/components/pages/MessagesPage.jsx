import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading messages
    setTimeout(() => {
      setMessages([]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <Loading />;

return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
<div className="mb-12">
          <h1 className="text-3xl font-semibold text-neutral-900">Meddelanden</h1>
          <p className="text-neutral-600 mt-2 text-sm">Kommunicera med fastighetsägare och byggföretag</p>
        </div>

        {messages.length === 0 ? (
          <div className="bg-white rounded-xl shadow-card p-12 border border-neutral-200">
<Empty
              icon="MessageCircle"
              title="Inga meddelanden än"
              description="När du börjar boka fastigheter eller ta emot bokningsförfrågningar kommer dina konversationer att visas här."
            />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 h-[600px]">
              {/* Message List */}
              <div className="lg:col-span-1 border-r border-gray-200">
<div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Konversationer</h2>
                </div>
                <div className="overflow-y-auto h-full">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      onClick={() => setSelectedMessage(message)}
                      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                        selectedMessage?.id === message.id ? 'bg-primary-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <ApperIcon name="User" className="h-5 w-5 text-primary-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900">{message.sender}</h3>
                            <span className="text-xs text-gray-500">{message.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">{message.lastMessage}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Detail */}
              <div className="lg:col-span-2">
                {selectedMessage ? (
                  <div className="h-full flex flex-col">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">{selectedMessage.sender}</h3>
                      <p className="text-sm text-gray-600">{selectedMessage.property}</p>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto">
                      {/* Messages would go here */}
                    </div>
<div className="p-4 border-t border-gray-200">
                      <div className="flex space-x-3">
                        <input
                          type="text"
                          placeholder="Skriv ditt meddelande..."
                          className="flex-1 input-field"
                        />
                        <button className="btn-primary">
                          <ApperIcon name="Send" className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
<ApperIcon name="MessageCircle" className="h-12 w-12 mx-auto mb-4" />
                      <p>Välj en konversation för att börja skicka meddelanden</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;