<?php

namespace UserBundle\Model;

use AppBundle\Model\RemoteResourceInterface;
use Symfony\Component\Security\Core\Role\Role;
use Symfony\Component\Security\Core\User\UserInterface;

class User implements UserInterface
{
    
    protected $username = 'admin';

    /**
     * @var array
     */
    protected $roles;


    /**
     * @inheritDoc
     */
    public function getUsername()
    {
        return $this->username;
    }


    /**
     * @inheritDoc
     */
    public function getRoles()
    {
        return $this->roles;
    }

    /**
     * @param array $roles
     */
    public function setRoles($roles)
    {
        $this->roles = $roles;
    }
    
    public function addRole($role)  {
        if (!is_array($this->roles))    {
            $this->roles = [];
        }
        
        if (!in_array($role, $this->roles)) {
            $this->roles[] = $role;
        }
    }

    /**
     * @inheritDoc
     */
    public function getPassword()
    {
    }

    /**
     * @inheritDoc
     */
    public function getSalt()
    {
    }

    /**
     * @inheritDoc
     */
    public function eraseCredentials()
    {
    }
}