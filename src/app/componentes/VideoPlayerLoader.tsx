"use client";
import React from "react";
import VideoPlayer from "./VideoPlayer";

// Simple client wrapper to render the VideoPlayer with defaults.
export default function VideoPlayerLoader({
  srcBase = "hero",
  poster = "/slider/pollo_feliz_1.svg",
}: { srcBase?: string; poster?: string }) {
  return <VideoPlayer srcBase={srcBase} poster={poster} controls className="w-full rounded-md" />;
}
