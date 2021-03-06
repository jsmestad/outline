// @flow
import * as React from 'react';
import { User, Document, Collection } from '../models';
import EmailTemplate from './components/EmailLayout';
import Body from './components/Body';
import Button from './components/Button';
import Heading from './components/Heading';
import Header from './components/Header';
import Footer from './components/Footer';
import EmptySpace from './components/EmptySpace';

export type Props = {
  actor: User,
  document: Document,
  collection: Collection,
  eventName: string,
};

export const documentNotificationEmailText = ({
  actor,
  document,
  collection,
  eventName = 'published',
}: Props) => `
"${document.title}" ${eventName}

${actor.name} ${eventName} the document "${document.title}", in the ${
  collection.name
} collection.

Open Document: ${process.env.URL}${document.url}
`;

export const DocumentNotificationEmail = ({
  actor,
  document,
  collection,
  eventName = 'published',
}: Props) => {
  return (
    <EmailTemplate>
      <Header />

      <Body>
        <Heading>
          "{document.title}" {eventName}
        </Heading>
        <p>
          {actor.name} {eventName} the document "{document.title}", in the{' '}
          {collection.name} collection.
        </p>
        <hr />
        <EmptySpace height={10} />
        <p>{document.getSummary()}</p>
        <EmptySpace height={10} />
        <p>
          <Button href={`${process.env.URL}${document.url}`}>
            Open Document
          </Button>
        </p>
      </Body>

      <Footer />
    </EmailTemplate>
  );
};
