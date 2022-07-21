import React from 'react';
import db from '../../utils/db';
import { useRouter } from 'next/router';
import DefaultErrorPage from 'next/error';
import {
  format,
  formatDistance,
  formatDistanceToNow,
  formatRelative,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';
import Loading from '../../components/loading';

function PostPage({ post }) {
  const router = useRouter();
  if (router.isFallback) {
    return <Loading />;
  }
  if (!post) {
    console.log('redirecting to notFound page');
    return <DefaultErrorPage statusCode={404} />;
  }
  return (
    <div className="flex flex-col max-w-6xl bg-gray-200 mx-auto min-h-screen px-8 py-4 shadow-xl shadow-violet-600">
      <div className="border-b-2 border-b-slate-400 pb-4 ">
        <h1 className="text-5xl font-medium font-h2 text-violet-600 text-center mb-5">
          {post.title}
        </h1>
        <p className="flex flex-col items-end">
          <span className="text-sm font-bold">Criado:</span>
          <span className="text-sm">
            {format(new Date(post.created), 'PPPPp', {
              addSuffix: true,
              locale: ptBR,
            })}
            {' - '}
            {formatDistanceToNow(new Date(post.created), {
              addSuffix: true,
              locale: ptBR,
            })}
          </span>
        </p>
        {post.updated && (
          <p className="flex flex-col items-end">
            <span className="text-sm font-bold">Atualizado:</span>
            <span className="text-sm">
              {format(new Date(post.updated), 'PPPPp', {
                addSuffix: true,
                locale: ptBR,
              })}{' '}
              {' - '}
              {formatDistanceToNow(new Date(post.updated), {
                addSuffix: true,
                locale: ptBR,
              })}
            </span>
          </p>
        )}
      </div>
      <div className="my-5 font-[Poppins] text-lg flex-grow">{post.body}</div>
      <footer className="sticky bottom-0 text-end">
        <Link passHref href={'/'}>
          <a className="button bg-violet-700 text-white px-16">Voltar</a>
        </Link>
      </footer>
    </div>
  );
}

export default PostPage;

export async function getStaticProps(context) {
  const { slug } = context.params;
  console.log('getStaticProps', format(new Date(), 'PPPPp', { locale: ptBR }));

  const posts = await db.collection('entries').where('slug', '==', slug).get();
  const entries = posts.docs.map((entry) => entry.data());
  if (entries.length) {
    return {
      props: {
        post: entries[0],
      },
      revalidate: 300,
    };
  }

  return {
    props: {},
  };
}

export const getStaticPaths = async () => {
  console.log('getStaticPaths', format(new Date(), 'PPPPp', { locale: ptBR }));
  const entries = await db.collection('entries').get();
  const paths = entries.docs.map((entry) => ({
    params: {
      slug: entry.data().slug,
    },
  }));

  console.log('paths: ', paths);
  return {
    paths,
    fallback: true,
  };
};
