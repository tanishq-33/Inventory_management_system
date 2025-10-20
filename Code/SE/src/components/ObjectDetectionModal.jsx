import React, { useState, useRef } from 'react';
import { X, Camera, Upload, Eye, Plus, AlertCircle } from 'lucide-react';
import { simulateObjectDetection } from '../utils/mockData';

function ObjectDetectionModal({ onClose, onAddToInventory }) {
  const [detectedObjects, setDetectedObjects] = useState([]);
  const [isDetecting, setIsDetecting] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert('Camera access denied or not available');
    }
  };

  const captureImage = async () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      const imageData = canvas.toDataURL('image/png');
      
      setIsDetecting(true);
      const objects = await simulateObjectDetection(imageData);
      setDetectedObjects(objects);
      setIsDetecting(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        setIsDetecting(true);
        const objects = await simulateObjectDetection(event.target.result);
        setDetectedObjects(objects);
        setIsDetecting(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToInventory = (detected) => {
    onAddToInventory(detected);
    setDetectedObjects(detectedObjects.filter(obj => obj.id !== detected.id));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Object Detection</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Camera/Upload Section */}
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-lg p-4 h-80 flex items-center justify-center relative overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{ display: videoRef.current?.srcObject ? 'block' : 'none' }}
              />
              <canvas ref={canvasRef} className="hidden" />
              {!videoRef.current?.srcObject && (
                <div className="text-center">
                  <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Camera not active</p>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={startCamera}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                <Camera className="w-5 h-5" />
                Start Camera
              </button>
              <button
                onClick={captureImage}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                <Camera className="w-5 h-5" />
                Capture
              </button>
            </div>
            
            <div className="relative">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 py-3 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
              >
                <Upload className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">Upload Image</span>
              </button>
            </div>
          </div>

          {/* Detection Results */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Detected Objects</h3>
            
            {isDetecting && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
                <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-blue-900 font-medium">Analyzing image...</p>
              </div>
            )}
            
            {!isDetecting && detectedObjects.length === 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No objects detected yet</p>
                <p className="text-sm text-gray-400 mt-2">Capture or upload an image to detect objects</p>
              </div>
            )}
            
            {!isDetecting && detectedObjects.length > 0 && (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {detectedObjects.map(obj => (
                  <div key={obj.id} className="bg-white border rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{obj.name}</h4>
                        <p className="text-sm text-gray-500">{obj.category}</p>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                        {Math.round(obj.confidence * 100)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Quantity: {obj.quantity}</span>
                      <button
                        onClick={() => handleAddToInventory(obj)}
                        className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                      >
                        <Plus className="w-4 h-4" />
                        Add to Inventory
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-900">
              <p className="font-medium mb-1">Demo Mode</p>
              <p>This is a simulated object detection system. In production, this would connect to an AI model like YOLO, TensorFlow, or a cloud vision API to detect real objects from images.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ObjectDetectionModal;