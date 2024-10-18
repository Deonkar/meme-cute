import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Heart, Image, Share2, Camera, Plus, Smile, X } from 'lucide-react';

// Mock data with different layouts and descriptions
const mockPhotos = [
  { 
    id: 1, 
    type: 'photo', 
    width: 'w-full', 
    height: 'h-80', 
    src: '/api/placeholder/800/600',
    alt: 'Sunset beach vibes 🌅',
    layout: 'featured'
  },
  { 
    id: 2, 
    type: 'photo', 
    width: 'w-1/2', 
    height: 'h-48', 
    src: '/api/placeholder/400/400',
    alt: 'Coffee time ☕️',
    layout: 'square'
  },
  { 
    id: 3, 
    type: 'photo', 
    width: 'w-1/2', 
    height: 'h-48', 
    src: '/api/placeholder/400/400',
    alt: 'Weekend adventures 🌲',
    layout: 'square'
  },
  { 
    id: 4, 
    type: 'photo', 
    width: 'w-1/3', 
    height: 'h-40', 
    src: '/api/placeholder/300/400',
    alt: 'City lights 🌃',
    layout: 'portrait'
  },
  { 
    id: 5, 
    type: 'photo', 
    width: 'w-1/3', 
    height: 'h-40', 
    src: '/api/placeholder/300/400',
    alt: 'Morning yoga 🧘‍♀️',
    layout: 'portrait'
  },
  { 
    id: 6, 
    type: 'photo', 
    width: 'w-1/3', 
    height: 'h-40', 
    src: '/api/placeholder/300/400',
    alt: 'Plant parent 🪴',
    layout: 'portrait'
  },
  { 
    id: 7, 
    type: 'photo', 
    width: 'w-1/2', 
    height: 'h-56', 
    src: '/api/placeholder/500/600',
    alt: 'Concert night 🎸',
    layout: 'portrait'
  },
  { 
    id: 8, 
    type: 'photo', 
    width: 'w-1/2', 
    height: 'h-56', 
    src: '/api/placeholder/500/600',
    alt: 'Art gallery 🎨',
    layout: 'portrait'
  }
];

const mockMemes = [
  { 
    id: 101, 
    type: 'meme', 
    width: 'w-full', 
    height: 'h-96', 
    src: '/api/placeholder/800/800',
    alt: 'Monday mood 😅',
    layout: 'square'
  },
  { 
    id: 102, 
    type: 'meme', 
    width: 'w-full', 
    height: 'h-96', 
    src: '/api/placeholder/800/800',
    alt: 'Programming life 💻',
    layout: 'square'
  },
  { 
    id: 103, 
    type: 'meme', 
    width: 'w-full', 
    height: 'h-96', 
    src: '/api/placeholder/800/800',
    alt: 'Weekend plans 🛋️',
    layout: 'square'
  }
];

const UploadModal = ({ type, onClose }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
    <Card className="w-full max-w-md bg-white rounded-3xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
          {type === 'meme' ? 'Add a Meme' : 'Add Photos'}
        </h3>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-500">
          <X className="w-5 h-5" />
        </Button>
      </div>

      <div className="space-y-6">
        <div 
          className="border-2 border-dashed border-pink-200 rounded-2xl p-8 hover:border-pink-400 transition-colors cursor-pointer bg-pink-50/50"
        >
          <div className="flex flex-col items-center space-y-3">
            {type === 'meme' ? 
              <Smile className="w-12 h-12 text-pink-400" /> :
              <Image className="w-12 h-12 text-purple-400" />
            }
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700">
                Drop your {type === 'meme' ? 'meme' : 'photos'} here
              </p>
              <p className="text-xs text-gray-500">or click to browse</p>
              {type === 'photo' && (
                <p className="text-xs text-pink-400 mt-2">You can select multiple photos</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button 
            className="flex-1 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-xl hover:opacity-90"
            onClick={onClose}
          >
            Upload
          </Button>
          <Button 
            variant="ghost" 
            className="flex-1 text-gray-500 rounded-xl"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Card>
  </div>
);

const ContentGrid = ({ items }) => (
  <div className="grid grid-cols-6 gap-3 auto-rows-min">
    {items.map((item, index) => (
      <div
        key={item.id}
        className={`${
          item.type === 'meme' || index === 0 ? 'col-span-6' : 
          item.layout === 'portrait' ? 'col-span-2' : 'col-span-3'
        } relative group`}
      >
        <div className={`${item.height} bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
          <img
            src={item.src}
            alt={item.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl">
            <div className="absolute bottom-3 left-3 text-white">
              <p className="text-sm font-medium">{item.alt}</p>
              <p className="text-xs opacity-75">Tap to view</p>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const CuteMoodBoard = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState(null);
  const [activeTab, setActiveTab] = useState('photos');

  const handleUpload = (type) => {
    setUploadType(type);
    setShowUploadModal(true);
  };

  return (
    <div className="max-w-md mx-auto h-screen bg-gradient-to-b from-pink-50 to-purple-50 overflow-auto">
      {showUploadModal && (
        <UploadModal 
          type={uploadType} 
          onClose={() => setShowUploadModal(false)} 
        />
      )}
      
      {/* Profile Header */}
      <div className="sticky top-0 z-10 p-6 bg-white rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
              <span className="text-xl text-white font-bold">✨</span>
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                @aesthetic_vibes
              </h2>
              <p className="text-sm text-gray-500">capturing moments & memes ✨</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              className="bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full hover:opacity-90"
              size="sm"
              onClick={() => handleUpload('photo')}
            >
              <Camera className="w-4 h-4 mr-1" />
              Photo
            </Button>
            <Button 
              className="bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full hover:opacity-90"
              size="sm"
              onClick={() => handleUpload('meme')}
            >
              <Smile className="w-4 h-4 mr-1" />
              Meme
            </Button>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="flex gap-4 mt-6">
          <Button
            variant={activeTab === 'photos' ? 'default' : 'ghost'}
            className={`flex-1 rounded-xl ${
              activeTab === 'photos' 
                ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white' 
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('photos')}
          >
            <Image className="w-4 h-4 mr-2" />
            Photos ({mockPhotos.length})
          </Button>
          <Button
            variant={activeTab === 'memes' ? 'default' : 'ghost'}
            className={`flex-1 rounded-xl ${
              activeTab === 'memes' 
                ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white' 
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('memes')}
          >
            <Smile className="w-4 h-4 mr-2" />
            Memes ({mockMemes.length})
          </Button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="p-4 pb-24">
        <ContentGrid items={activeTab === 'photos' ? mockPhotos : mockMemes} />
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0">
        <div className="max-w-md mx-auto">
          <div className="bg-white/80 backdrop-blur-lg border-t border-pink-100 p-4 rounded-t-3xl flex justify-around">
            <Button 
              variant="ghost" 
              size="lg" 
              className="flex flex-col items-center text-pink-500 hover:text-purple-500 transition-colors"
            >
              <Heart className="w-6 h-6 mb-1" />
              <span className="text-xs">Like</span>
            </Button>
            <Button 
              variant="ghost" 
              size="lg" 
              className="flex flex-col items-center text-pink-500 hover:text-purple-500 transition-colors"
            >
              <MessageCircle className="w-6 h-6 mb-1" />
              <span className="text-xs">Message</span>
            </Button>
            <Button 
              variant="ghost" 
              size="lg" 
              className="flex flex-col items-center text-pink-500 hover:text-purple-500 transition-colors"
            >
              <Share2 className="w-6 h-6 mb-1" />
              <span className="text-xs">Share</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuteMoodBoard;
