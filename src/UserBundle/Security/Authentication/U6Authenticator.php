<?php

namespace UserBundle\Security\Authentication;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\PreAuthenticatedToken;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Http\Authentication\AuthenticationFailureHandlerInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Http\Authentication\SimpleFormAuthenticatorInterface;
use Symfony\Component\Security\Http\Authentication\SimplePreAuthenticatorInterface;
use UserBundle\UserProvider\U6UserProvider;

class U6Authenticator implements SimpleFormAuthenticatorInterface, AuthenticationFailureHandlerInterface
{

    /**
     * @param Request $request
     * @param $username
     * @param $password
     * @param $providerKey
     * @return PreAuthenticatedToken
     * 
     * Authenticate only admin user
     * 
     */
    public function createToken(Request $request, $username, $password, $providerKey)
    {
        if ($username === 'admin')  {

            return new PreAuthenticatedToken(
                'anon.',
                'admin',
                $providerKey
            );
        }
        else    {
            return new PreAuthenticatedToken(
                'anon.',
                null,
                $providerKey
            );
        }

    }

    public function authenticateToken(TokenInterface $token, UserProviderInterface $userProvider, $providerKey)
    {
        if (!$userProvider instanceof U6UserProvider) {
            throw new \InvalidArgumentException(
                sprintf(
                    'The user provider must be an instance of ApiKeyUserProvider (%s was given).',
                    get_class($userProvider)
                )
            );
        }

        $token = $token->getCredentials();


        $user = $userProvider->loadUserByUsername($token);


        if (!$user) {
            return new PreAuthenticatedToken(
                'anon.',
                $token,
                $providerKey
            );
        }

        return new PreAuthenticatedToken(
            $user,
            $token,
            $providerKey,
            $user->getRoles()
        );
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        return new Response(
            strtr($exception->getMessageKey(), $exception->getMessageData()),
            403
        );
    }

    public function supportsToken(TokenInterface $token, $providerKey)
    {
        return $token instanceof PreAuthenticatedToken && $token->getProviderKey() === $providerKey;
    }
}