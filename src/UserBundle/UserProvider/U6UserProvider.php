<?php

namespace UserBundle\UserProvider;

use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use UserBundle\Model\User;

class U6UserProvider implements UserProviderInterface
{


    public function refreshUser(UserInterface $user)
    {
        return $user;
    }

    public function loadUserByUsername($username)
    {
        if ($username === 'admin')  {
            $user = new User;
            $user->addRole('ROLE_ADMIN');

            return $user;
        }

        return null;
    }

    public function supportsClass($class)
    {
        return $class === User::class;
    }
}
