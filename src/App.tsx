import React, { useState } from 'react';
import { Search, MapPin, Star, Utensils, Coffee, Hotel, Heart, MessageCircle, LogIn, PlusCircle, X } from 'lucide-react';

interface Restaurant {
  id: number;
  name: string;
  type: string;
  rating: number;
  image: string;
  location: string;
  cuisine: string;
  likes: number;
  comments: Comment[];
}

interface Comment {
  id: number;
  user: string;
  text: string;
  date: string;
}

const initialRestaurants: Restaurant[] = [
  {
    id: 1,
    name: "Joe's Diner",
    type: "Restaurant",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    location: "Downtown",
    cuisine: "American",
    likes: 124,
    comments: [
      { id: 1, user: "FoodLover", text: "Best burgers in town!", date: "2024-03-10" },
      { id: 2, user: "TasteExplorer", text: "Great atmosphere and service", date: "2024-03-09" }
    ]
  },
  {
    id: 2,
    name: "Grand Hotel Restaurant",
    type: "Hotel Restaurant",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1592861956120-e524fc739696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    location: "Uptown",
    cuisine: "International",
    likes: 89,
    comments: [
      { id: 1, user: "GourmetGuru", text: "Exquisite fine dining experience", date: "2024-03-10" }
    ]
  },
  {
    id: 3,
    name: "Café Luna",
    type: "Café",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1147&q=80",
    location: "Midtown",
    cuisine: "Coffee & Pastries",
    likes: 156,
    comments: [
      { id: 1, user: "CoffeeLover", text: "Amazing lattes and pastries!", date: "2024-03-08" }
    ]
  }
];

interface NewRestaurant {
  name: string;
  type: string;
  image: string;
  location: string;
  cuisine: string;
  rating: number;
  review: string;
}

const initialNewRestaurant: NewRestaurant = {
  name: '',
  type: 'Restaurant',
  image: '',
  location: '',
  cuisine: '',
  rating: 5,
  review: ''
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSignIn, setShowSignIn] = useState(false);
  const [showAddRestaurant, setShowAddRestaurant] = useState(false);
  const [restaurants, setRestaurants] = useState(initialRestaurants);
  const [newComment, setNewComment] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [newRestaurant, setNewRestaurant] = useState<NewRestaurant>(initialNewRestaurant);

  const handleLike = (id: number) => {
    setRestaurants(restaurants.map(restaurant => 
      restaurant.id === id 
        ? { ...restaurant, likes: restaurant.likes + 1 }
        : restaurant
    ));
  };

  const handleAddComment = (restaurantId: number) => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now(),
      user: "Guest",
      text: newComment,
      date: new Date().toISOString().split('T')[0]
    };

    setRestaurants(restaurants.map(restaurant => 
      restaurant.id === restaurantId 
        ? { ...restaurant, comments: [...restaurant.comments, comment] }
        : restaurant
    ));
    setNewComment('');
  };

  const handleAddRestaurant = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRestaurantEntry: Restaurant = {
      id: Date.now(),
      ...newRestaurant,
      likes: 0,
      comments: [{
        id: Date.now(),
        user: "Owner",
        text: newRestaurant.review,
        date: new Date().toISOString().split('T')[0]
      }]
    };

    setRestaurants([newRestaurantEntry, ...restaurants]);
    setNewRestaurant(initialNewRestaurant);
    setShowAddRestaurant(false);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-[#9b5de5] text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Utensils className="w-8 h-8" />
              <h1 className="text-4xl font-bold">FoodMan</h1>
            </div>
            <div className="flex items-center gap-4">
              <button 
                className="doodle-button"
                onClick={() => setShowAddRestaurant(true)}
              >
                <PlusCircle className="w-4 h-4 inline-block mr-2" />
                Add Restaurant
              </button>
              <button 
                className="doodle-button"
                onClick={() => setShowSignIn(true)}
              >
                <LogIn className="w-4 h-4 inline-block mr-2" />
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Add Restaurant Modal */}
      {showAddRestaurant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg doodle-border max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Add New Restaurant</h2>
              <button 
                onClick={() => setShowAddRestaurant(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddRestaurant} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Restaurant Name
                </label>
                <input
                  type="text"
                  required
                  className="doodle-input"
                  value={newRestaurant.name}
                  onChange={(e) => setNewRestaurant({...newRestaurant, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  className="doodle-input"
                  value={newRestaurant.type}
                  onChange={(e) => setNewRestaurant({...newRestaurant, type: e.target.value})}
                >
                  <option value="Restaurant">Restaurant</option>
                  <option value="Hotel Restaurant">Hotel Restaurant</option>
                  <option value="Café">Café</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  required
                  className="doodle-input"
                  placeholder="https://images.unsplash.com/..."
                  value={newRestaurant.image}
                  onChange={(e) => setNewRestaurant({...newRestaurant, image: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  required
                  className="doodle-input"
                  value={newRestaurant.location}
                  onChange={(e) => setNewRestaurant({...newRestaurant, location: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cuisine Type
                </label>
                <input
                  type="text"
                  required
                  className="doodle-input"
                  value={newRestaurant.cuisine}
                  onChange={(e) => setNewRestaurant({...newRestaurant, cuisine: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating (1-5)
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max="5"
                  step="0.1"
                  className="doodle-input"
                  value={newRestaurant.rating}
                  onChange={(e) => setNewRestaurant({...newRestaurant, rating: parseFloat(e.target.value)})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Initial Review
                </label>
                <textarea
                  required
                  className="doodle-input min-h-[100px]"
                  value={newRestaurant.review}
                  onChange={(e) => setNewRestaurant({...newRestaurant, review: e.target.value})}
                />
              </div>

              <div className="flex gap-4">
                <button 
                  type="submit"
                  className="doodle-button w-full"
                >
                  Add Restaurant
                </button>
                <button 
                  type="button"
                  className="doodle-button w-full bg-gray-500"
                  onClick={() => setShowAddRestaurant(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sign In Modal */}
      {showSignIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg doodle-border max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
            <input
              type="email"
              placeholder="Email"
              className="doodle-input mb-4"
            />
            <input
              type="password"
              placeholder="Password"
              className="doodle-input mb-6"
            />
            <div className="flex gap-4">
              <button 
                className="doodle-button w-full"
                onClick={() => setShowSignIn(false)}
              >
                Sign In
              </button>
              <button 
                className="doodle-button w-full bg-gray-500"
                onClick={() => setShowSignIn(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Section */}
      <div className="bg-[#f3d2ff] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative doodle-border bg-white">
              <input
                type="text"
                placeholder="Search for restaurants, hotels, cafés..."
                className="w-full py-4 px-12 text-lg outline-none bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="doodle-card text-center">
            <Utensils className="w-12 h-12 mx-auto mb-4 text-[#9b5de5]" />
            <h3 className="text-xl font-bold">Restaurants</h3>
          </div>
          <div className="doodle-card text-center">
            <Hotel className="w-12 h-12 mx-auto mb-4 text-[#9b5de5]" />
            <h3 className="text-xl font-bold">Hotel Dining</h3>
          </div>
          <div className="doodle-card text-center">
            <Coffee className="w-12 h-12 mx-auto mb-4 text-[#9b5de5]" />
            <h3 className="text-xl font-bold">Cafés</h3>
          </div>
        </div>
      </div>

      {/* Listings */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Popular Places</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map((place) => (
            <div key={place.id} className="doodle-card">
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-48 object-cover mb-4 doodle-border"
              />
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{place.name}</h3>
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{place.location}</span>
                  </div>
                  <p className="text-gray-600">{place.cuisine}</p>
                </div>
                <div className="flex items-center gap-1 bg-[#9b5de5] text-white px-2 py-1 rounded-full">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{place.rating}</span>
                </div>
              </div>

              {/* Likes and Comments Section */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center gap-4 mb-4">
                  <button 
                    className="flex items-center gap-1 text-[#9b5de5]"
                    onClick={() => handleLike(place.id)}
                  >
                    <Heart className="w-5 h-5" />
                    <span>{place.likes}</span>
                  </button>
                  <button 
                    className="flex items-center gap-1 text-[#9b5de5]"
                    onClick={() => setSelectedRestaurant(selectedRestaurant?.id === place.id ? null : place)}
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{place.comments.length}</span>
                  </button>
                </div>

                {/* Comments */}
                {selectedRestaurant?.id === place.id && (
                  <div className="mt-4">
                    <div className="space-y-4 mb-4">
                      {place.comments.map((comment) => (
                        <div key={comment.id} className="bg-purple-50 p-3 rounded-lg">
                          <div className="flex justify-between text-sm text-gray-600">
                            <span className="font-bold">{comment.user}</span>
                            <span>{comment.date}</span>
                          </div>
                          <p className="mt-1">{comment.text}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        className="doodle-input flex-grow"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      />
                      <button 
                        className="doodle-button"
                        onClick={() => handleAddComment(place.id)}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;