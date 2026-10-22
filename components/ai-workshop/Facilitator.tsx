'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FACILITATOR } from '@/lib/aiWorkshop';
import { FACILITATOR_PHOTO, FACILITATOR_SITE } from '@/lib/config';
import { ArrowUpRight } from './Icons';

function PortraitPlaceholder() {
  return (
    <span className="portrait portrait--placeholder">
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable={false}>
        <g fill="none" stroke="rgba(16,35,28,.22)" strokeWidth="2">
          <circle cx="200" cy="250" r="90" />
          <circle cx="200" cy="250" r="150" />
          <circle cx="200" cy="250" r="210" />
          <circle cx="200" cy="250" r="270" />
        </g>
        <circle cx="200" cy="205" r="52" fill="rgba(16,35,28,.14)" />
        <path d="M96 420c8-62 52-96 104-96s96 34 104 96z" fill="rgba(16,35,28,.14)" />
      </svg>
      <span className="portrait__tag">Portrait placeholder · 800 × 1000</span>
    </span>
  );
}

/**
 * The whole card is one real link to the facilitator's personal website.
 * A hanging ID-badge: it floats gently, lifts on hover, and shows a clear focus ring.
 */
function ProfileCard() {
  const [photoFailed, setPhotoFailed] = useState(false);
  const showPhoto = FACILITATOR_PHOTO !== null && !photoFailed;

  return (
    <a
      className="idcard"
      href={FACILITATOR_SITE}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${FACILITATOR.name}, ${FACILITATOR.role}. Visit michaelgichamu.tech (opens in a new tab)`}
    >
      <span className="idcard__float">
        <span className="idcard__lanyard" aria-hidden="true" />
        <span className="idcard__slot" aria-hidden="true" />
        {showPhoto ? (
          <span className="portrait">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={FACILITATOR_PHOTO!}
              alt={`Portrait of ${FACILITATOR.name}`}
              width={800}
              height={1000}
              loading="lazy"
              decoding="async"
              onError={() => setPhotoFailed(true)}
            />
          </span>
        ) : (
          <PortraitPlaceholder />
        )}
        <span className="idcard__body">
          <span className="idcard__name">{FACILITATOR.name}</span>
          <span className="idcard__role">{FACILITATOR.role}</span>
        </span>
        <span className="idcard__foot">
          <span>Visit my website</span>
          <ArrowUpRight />
        </span>
      </span>
    </a>
  );
}

export function Facilitator() {
  return (
    <section className="section facilitator theme-dark" id="facilitator" aria-labelledby="facilitator-title">
      <div className="container">
        <div className="fac__grid">
          <div className="fac__cardwrap">
            <ProfileCard />
          </div>

          <div className="fac__bio">
            <h2 id="facilitator-title">{FACILITATOR.title}</h2>
            <p className="fac__who">
              {FACILITATOR.name}, {FACILITATOR.role}
            </p>
            {FACILITATOR.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
